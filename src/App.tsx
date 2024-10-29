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
    explorers: [{ name: 'BaseScan', url: 'https://basescan.org/address/' }],
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
      {/* Page Header section */}
      <img className="logo" src={logo} alt="logo" />
      <h1>
        {`Sadly HaloFi is no `}
        <a
          href="https://medium.com/halofi/halofi-farewell-a-message-to-our-community-2069ea101b91?source=friends_link&sk=970b9f61910448de19613431aa5c28c0"
          target="_blank"
          className="h1"
        >
          {`longer available.`}
        </a>
      </h1>

      {/* HaloFi Save Section */}
      <h2>HaloFi Save</h2>
      <p>
        <b>For HaloFi Save users, please withdraw your funds via:</b>
      </p>
      <div>
        <p>
          <a href="https://app.moola.market/" target="_blank">
            {`Moola on Celo`}
          </a>
          {` | `}
          <a
            href="https://celoscan.io/address/0x970b12522CA9b4054807a2c5B736149a5BE6f670"
            target="_blank"
          >
            {`Moola Smart Contract`}
          </a>
        </p>

        <p>
          <a href="https://app.beefy.com" target="_blank">
            {`Beefy on Base`}
          </a>
          {` | `}
          <a
            href="https://basescan.org/address/0xef6ed674486e54507d0f711c0d388bd8a1552e6f"
            target="_blank"
          >
            {`Beefy Smart Contract`}
          </a>
        </p>

        <p>
          <a href="https://app.aave.com" target="_blank">
            {`AaveV3 on Base`}
          </a>
          {` | `}
          <a
            href="https://basescan.org/address/0xa238dd80c259a72e81d7e4664a9801593f98d1c5"
            target="_blank"
          >
            {`AaveV3 Smart Contract`}
          </a>
        </p>
      </div>

      {/* HaloFi Challenges Section */}
      <h2>HaloFi Challenges</h2>
      <p>
        <b>
          This Community Legacy site displays a static list (snapshot) of
          Challenges for a given wallet address.
        </b>
      </p>
      <p>
        <b>
          Withdrawals performed after the snapshot was taken are NOT reflected
          in the list below.
        </b>
      </p>

      <div className="instructions">
        <p>Use the steps below to list your Challenges:</p>
        <p>1. Enter your wallet address</p>
        <p>2. Click "Show challenges"</p>
        <p>3. Withdraw funds using the block explorer - only if needed</p>
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

      {/* Page Bottom Section */}
      <div className="instructions">
        <p>Not sure what to do? Read or watch the community tutorials below:</p>
        <a
          href="https://medium.com/halofi/halofi-legacy-support-continue-to-withdraw-your-funds-9fc1a2039fc1?source=friends_link&sk=e6e7230cae6a735334294ba213adf8df"
          target="_blank"
        >
          Blog Tutorial
        </a>
        <a href="https://youtu.be/yQxBKxHl0VU" target="_blank">
          Save Video Tutorial
        </a>
        <a href="https://youtu.be/OKR-a4boGYg" target="_blank">
          Challenges Video Tutorial
        </a>
      </div>
    </div>
  );
}

export default App
