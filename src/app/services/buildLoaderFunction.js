import DataLoader from 'dataLoader';

export default service => ids => Promise.all(ids.map(service.findById.bind(service)));
