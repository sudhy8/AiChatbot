'use client'

import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

// Create a wrapper component for Chat
const ChatWrapper = dynamic(
  () => import('./chatWrapper'),
  {
    ssr: false,
    loading: () => <p>Loading Chat...</p>
  }
);

const App = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading indicator
  }

  return <ChatWrapper />;
}

export default App;