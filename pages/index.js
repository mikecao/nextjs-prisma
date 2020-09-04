import React from 'react';

export default function Home() {
  const runTest = async () => {
    await fetch(
      '/api/hello',
      {
        method: 'get',
        cache: 'no-cache',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
  }

  return (
    <main>
      <h1>Test Prisma Disconnect</h1>
      <button onClick={runTest}>Run Test</button>
    </main>
  )
}
