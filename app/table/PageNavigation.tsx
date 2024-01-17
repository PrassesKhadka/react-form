import React from "react";

type PageNavigationProps = {
  totalPages: number;
  next: () => void;
  previous: () => void;
};

const PageNavigation: React.FC<PageNavigationProps> = ({
  totalPages,
  next,
  previous,
}) => {
  const renderButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} className="join-item btn">
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="w-full border justify-center gap-4">
      <div className="justify-center gap-2">
        <button onClick={previous} className="join-item btn btn-outline">
          Previous page
        </button>
        {renderButtons()}
        <button onClick={next} className="join-item btn btn-outline">
          Next
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;
