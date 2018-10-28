export default {
  location: context => {
    const { coeffects: { registry } } = context;
    return registry.history.location;
  },
};
