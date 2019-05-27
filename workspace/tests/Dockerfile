FROM cypress/browsers:chrome67

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /home/app/tests
RUN cp -a /tmp/node_modules /home/app/tests
ADD . /home/app/tests
