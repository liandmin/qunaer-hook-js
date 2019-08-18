import React, { Component, useState, useEffect, useRef, useCallback } from 'react'

function useCounter(count) {
  const size = useSize();
  return (
    <h1>{count}, {size.width} * {size.height}</h1>
  )
}

function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  const countRef = useRef();
  useEffect(() => {
    countRef.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
  }, []);
  useEffect(() => {
    if (count >= 10) {
      clearInterval(countRef.current);
    }
  })

  return [count, setCount];
}

function useSize() {
  const [size, setSize] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight,
  });
  const onResize = useCallback(() => {
      setSize({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight,
      });
    }, []);
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return size;
}

function App() {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click ({count}), {size.width} * {size.height}
      </button>
      {Counter}
    </div>
  )
}

export default App;