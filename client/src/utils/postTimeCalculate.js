export const postTimeCalculate = () => {
  const calculateRelativeTime = (postTime) => {
    const currentTime = new Date();
    const postDate = new Date(postTime);
    const timeDifference = currentTime - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return "Just now";
    }
  };
  return calculateRelativeTime;
};
