import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

const Toast = ({ children, duration, onHide }) => {
  const [opacity, setOpacity] = useState(0);
  
  const handleTransitionEnd = () => {
    if (opacity > 0) {
      setTimeout(() => {
        setOpacity(0)
      }, duration)
    } else {
      onHide()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    });
  }, []);

  return (
    <div class="toast" style={{ opacity }} onTransitionEnd={handleTransitionEnd}>
      {children}
    </div>
  );
};

export const showToast = ({ duration, content }) => {
  const container = document.querySelector('#toast');
  ReactDOM.render(
    <Toast
      duration={duration}
      onHide={() => {
        ReactDOM.unmountComponentAtNode(container)
      }}
    >
      {content}
    </Toast>,
    container
  );
};
