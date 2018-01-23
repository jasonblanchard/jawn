FROM phusion/passenger-customizable

# Set correct environment variables.
ENV HOME /root

# Set up baseimage-docker's for node.
RUN /pd_build/nodejs.sh

# Install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Nginx and Passenger are disabled by default. Enable them
RUN rm -f /etc/service/nginx/down

# Configure nginx
RUN rm /etc/nginx/sites-enabled/default
ADD ops/nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf
ADD ops/nginx/postgres-env.conf /etc/nginx/main.d/postgres-env.conf

# Add app with cached layer for node_modules
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --production
RUN mkdir -p /home/app/webapp
RUN cp -a /tmp/node_modules /home/app/webapp
ADD . /home/app/webapp

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]
