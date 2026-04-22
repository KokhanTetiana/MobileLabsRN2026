export const generateNews = (count, startId = 0) => {
  return Array.from({ length: count }, (_, i) => ({
    id: (startId + i).toString(),
    title: `Новина ${startId + i}`,
    description: "Короткий опис новини",
    image: `https://picsum.photos/600/400?random=${startId + i}`
  }));
};