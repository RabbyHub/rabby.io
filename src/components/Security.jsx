import React from 'react';

const Security = () => {
  return (
    <div className="security">
      <h2 className="title">Security over user experience</h2>
      <div className="security-content">
        <div className="container">
          <ol>
            <li>Open sourced & audited by the professional security company</li>
            <li>
              The only one using the most friendly MIT license among mainstream
              extension wallets
            </li>
            <li>
              Adopt the well-proven private key management component from
              MetaMask
            </li>
          </ol>
          <a
            href="https://medium.com/@rabby_io/rabby-release-announcement-564406988e2b"
            target="_blank"
            rel="noreferrer"
            className="security-link"
          >
            Click to see more security policies from Rabby
            <img
              src="/assets/images/arrow-right.svg"
              className="icon-arrow-right"
              alt="link"
            />
          </a>
        </div>
        <div className="security-audit">
          <a
            href="https://github.com/RabbyHub/Rabby/blob/master/docs/SlowMist%20Audit%20Report%20-%20Rabby%20Wallet-2023.07.20.pdf"
            target="_blank"
            rel="noreferrer"
            className="security-audit-card"
          >
            <img src="/assets/images/audit-3.png" alt="audit3" />
          </a>
          <a
            href="https://github.com/RabbyHub/Rabby/blob/master/docs/SlowMist%20Audit%20Report%20-%20Rabby%20browser%20extension%20wallet-2022.03.18.pdf"
            target="_blank"
            rel="noreferrer"
            className="security-audit-card"
          >
            <img src="/assets/images/audit-2.jpg" alt="audit2" />
          </a>
          <a
            href="https://github.com/RabbyHub/Rabby/blob/master/docs/Rabby%20chrome%20extension%20Penetration%20Testing%20Report.pdf"
            target="_blank"
            rel="noreferrer"
            className="security-audit-card"
          >
            <img src="/assets/images/audit-1.jpg" alt="audit1" />
          </a>
        </div>
      </div>
      <div className="rentage-bg" />
    </div>
  );
};

export default Security;
