export const getImageUrl = (path) => {
    if (path.startsWith('http')) {
      return path; 
    }
    return `/assets/${path}`;
  };
  