const statusColor = {
  "Total Patients": "#1f66ba",
  "Total Health Center": "#FFD700",
  "Total User": "#FF4500",
  "Active Patient": "#6A0DAD",
  "In Active Patient": "#2596be",
};

const processStatus = (data) => {
  const chartData = data.map((item) => ({
    ...item,
    count: Number(item.counts),
    fill: statusColor[item.name],
  }));
  return chartData;
};

export default processStatus;
