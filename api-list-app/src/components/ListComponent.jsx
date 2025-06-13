function ListComponent({ items = [], renderItem, fallback = 'No items found.' }) {
  if (!items.length) {
    return <div className="message">{fallback}</div>;
  }
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id ?? index}>{renderItem ? renderItem(item) : item}</li>
      ))}
    </ul>
  );
}

export default ListComponent;
