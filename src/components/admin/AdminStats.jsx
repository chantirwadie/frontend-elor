const AdminStats = ({ stats = {} }) => {
  const items = [
    { label: 'Produits', value: stats.products || 0, trend: '+12% ce mois' },
    { label: 'Commandes', value: stats.orders || 0, trend: '+8% ce mois' },
    { label: 'Clients', value: stats.customers || 0, trend: '+15% ce mois' },
    { label: 'Messages', value: stats.messages || 0, trend: 'Non lus: 0' },
  ];

  return (
    <div className="admin-stats">
      {items.map((item) => (
        <div key={item.label} className="stat-card">
          <h3>{item.label}</h3>
          <div className="stat-number">{item.value}</div>
          <div className="stat-trend">{item.trend}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
