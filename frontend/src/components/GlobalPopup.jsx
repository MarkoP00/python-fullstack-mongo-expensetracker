const GlobalPopup = ({ title, message, onAction, onClose }) => {
  const stopClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section
      onClick={onClose}
      className="min-h-screen w-full bg-black/30 fixed top-0 left-0 z-50 flex justify-center items-center backdrop-blur-sm p-6 animate-fadeIn">
      <main
        onClick={(e) => stopClick(e)}
        className="bg-background/95 backdrop-blur-md shadow-2xl rounded-xl max-w-md w-full p-8 border border-action/30 relative animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all hover:scale-110 text-2xl"
          aria-label="Close">
          &times;
        </button>

        <div>
          <h2 className="text-2xl font-bold text-action border-b border-gray-700 pb-2">
            {title}
          </h2>
        </div>
        <div className="py-4 text-lg text-text">
          <span>{message}</span>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={onAction}
            className="bg-action/80  hover:bg-action text-background font-medium py-2 px-4 rounded-lg transition-all flex-1">
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-red-500/90 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all flex-1">
            No
          </button>
        </div>
      </main>
    </section>
  );
};

export default GlobalPopup;
