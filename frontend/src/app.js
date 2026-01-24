const e = React.createElement;

function App() {
  const [msg, setMsg] = React.useState('Loading...');

  React.useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg('Could not reach backend'));
  }, []);

  return e('div', { style: { fontFamily: 'Arial, sans-serif', padding: '2rem' } },
    e('h1', null, 'DevOps Fullstack Frontend'),
    e('p', null, msg)
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App));
