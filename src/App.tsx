import { useState } from 'react'
import logo from '/logo.svg';
import './App.css';
import { USER_POOLS } from './userPoolData';
import { POOLS } from './poolData';

const NETWORKS = {
  137: {
    name: 'Polygon',
    explorers: [
      { name: 'PolygonScan', url: 'https://polygonscan.com/address/' },
    ],
  },
  42220: {
    name: 'Celo',
    explorers: [
      { name: 'CeloScan', url: 'https://celoscan.io/address/' },
      {
        name: 'CeloExplorer',
        url: 'https://explorer.celo.org/mainnet/address/',
      },
    ],
  },
  8453: {
    name: 'Base',
    explorers: [{ name: 'BaseScan', url: 'https://basescan.com/address/' }],
  },
};

function App() {
  const [showTable, setShowTable] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [filteredPools, setFilteredPools] = useState([]);

  const handleWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleResetClick = () => {
    setWalletAddress('');
    setShowTable(false);
  };

  const handleButtonClick = () => {
    const userPools = USER_POOLS[String(walletAddress || '').toLowerCase()];
    const data = [];
    if (Array.isArray(userPools)) {
      userPools.forEach((item) => {
        data.push({
          ...POOLS[String(item?.poolAddress || '').toLowerCase()],
          ...item,
        });
      });
    }

    setFilteredPools(data);
    setShowTable(true);
  };

  return (
    <div>
      <a
        href="https://halofi.medium.com/2069ea101b91?source=friends_link&sk=970b9f61910448de19613431aa5c28c0"
        target="_blank"
      >
        <img className="logo" src={logo} alt="logo" />
      </a>
      <p className="lighter">HaloFi Challenges is no longer available.</p>
      <p className="lighter">
        This Community Legacy site displays a static list (snapshot) of
        Challenges for a given wallet address.
      </p>
      <p className="lighter">
        Withdrawals performed after the snapshot are NOT reflected in the list
        below.
      </p>

      <div className="instructions">
        <p className="bold">Use the steps below to list your Challenges:</p>
        <p>1. Enter your wallet address</p>
        <p>2. Click "Show challenges"</p>
        <p>3. Withdraw funds using the block explorer - only if needed</p>
      </div>
      <div className="instructions">
        <p>Not sure what to do? Read or watch the community tutorials below:</p>
        <a href="https://halofi.medium.com/" target="_blank">
          Blog Tutorial
        </a>
        <a
          href="https://www.youtube.com/channel/UC3f3s4Xv073AJQtYcmKoH7A/videos"
          target="_blank"
        >
          Video Tutorial
        </a>
      </div>

      <input
        type="text"
        value={walletAddress}
        onChange={handleWalletAddressChange}
        placeholder="Enter wallet address"
      />
      <div className="button-group">
        <button onClick={handleButtonClick}>Show challenges</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
      {showTable && filteredPools.length == 0 && (
        <p className="error">Challenges not found for this wallet address</p>
      )}
      {showTable && filteredPools.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className="center">Display ID</th>
              <th className="left">Name</th>
              <th className="center">Withdrawn?</th>
              <th className="center">Withdrawn From</th>
              <th className="left">Full Name</th>
              <th className="center">Network</th>
            </tr>
          </thead>
          <tbody>
            {filteredPools.map((pool) => (
              <tr
                key={pool.poolDisplayID}
                style={{ border: '1px solid black' }}
              >
                <td className="center">{pool.poolDisplayID}</td>
                <td className="left">{pool.poolShortName}</td>
                <td className={`center ${pool.withdrawn ? 'ok' : 'pending'}`}>
                  {pool.withdrawn ? 'Yes' : 'No'}
                </td>
                <td className="center">
                  <a
                    href={`${NETWORKS[pool?.networkId]?.explorers[0]?.url}${pool?.poolAddress}`}
                    target="_blank"
                  >
                    <span>{NETWORKS[pool?.networkId]?.explorers[0]?.name}</span>
                  </a>
                  {NETWORKS[pool?.networkId]?.explorers[1] && (
                    <>
                      <span>{`  |  `}</span>
                      <a
                        href={`${NETWORKS[pool?.networkId]?.explorers[1]?.url}${pool?.poolAddress}`}
                        target="_blank"
                      >
                        <span>
                          {`${NETWORKS[pool?.networkId]?.explorers[1]?.name}`}
                        </span>
                      </a>
                    </>
                  )}
                </td>
                <td className="left">{pool.poolName}</td>
                <td className="center">{`${NETWORKS[pool?.networkId]?.name || '-'} | ${pool?.networkId || '-'}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App
