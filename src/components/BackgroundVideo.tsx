const BackgroundVideo = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-gradient-to-b from-amazon-dark/95 to-amazon-dark/40" />
    </>
  );
};

export default BackgroundVideo; 