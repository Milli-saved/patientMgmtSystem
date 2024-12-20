const statusColor = {
  Patients: "#1f66ba",
  Doctors: "#FFD700",
  Admins: "#FF4500",
  "Other Staff": "#6A0DAD",
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
