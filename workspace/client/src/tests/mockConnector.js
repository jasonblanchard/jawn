export default function(connectorProps) {
  return function MockConnector(props) {
    return props.children({ ...connectorProps });
  };
}
