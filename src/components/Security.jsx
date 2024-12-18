import { useState } from "react";
import clsx from "clsx";

const getProductName = (type) => {
  switch (type) {
    case "extension":
      return "Rabby Extension";
    case "mobile":
      return "Rabby Mobile";
    case "desktop":
      return "Rabby Desktop";
    default:
      return "";
  }
};

const securityCompany = {
  slowmist: {
    name: "SlowMist",
    url: "https://slowmist.io/",
    twitter: "https://x.com/SlowMist_Team",
    logo: "/assets/images/security/slowmist.png",
  },
  cure53: {
    name: "Cure53",
    url: "https://cure53.de/",
    twitter: "https://x.com/cure53berlin",
    logo: "/assets/images/security/cure53.png",
  },
  leastauthority: {
    name: "Least Authority",
    url: "https://leastauthority.com/",
    twitter: "https://x.com/LeastAuthority",
    logo: "/assets/images/security/leastauthority.png",
  },
};

const audits = [
  {
    company: "slowmist",
    product: "extension",
    date: "2021/06/18", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/Rabby/blob/master/docs/Rabby%20chrome%20extension%20Penetration%20Testing%20Report.pdf",
  },
  {
    company: "slowmist",
    product: "extension",
    date: "2022/03/18", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/Rabby/blob/master/docs/SlowMist%20Audit%20Report%20-%20Rabby%20browser%20extension%20wallet-2022.03.18.pdf",
  },
  {
    company: "slowmist",
    product: "extension",
    date: "2023/07/20", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/Rabby/blob/master/docs/SlowMist%20Audit%20Report%20-%20Rabby%20Wallet-2023.07.20.pdf",
  },
  {
    company: "slowmist",
    product: "extension",
    date: "2024/12/17", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/Rabby/blob/develop/docs/Rabby%20Browser%20Extension%20Wallet%20-%20SlowMist%20Audit%20Report-20241217.pdf",
  },
  {
    company: "leastauthority",
    product: "extension",
    date: "2024/12/12", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/Rabby/blob/develop/docs/Least%20Authority%20-%20DeBank%20Rabby%20Wallet%20Extension%20Final%20Audit%20Report-20241212.pdf",
  },
  {
    company: "leastauthority",
    product: "mobile",
    date: "2024/10/18", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/rabby-mobile/blob/develop/docs/Least%20Authority%20-%20Debank%20Rabby%20Walle%20Audit%20Report.pdf",
  },
  {
    company: "cure53",
    product: "mobile",
    date: "2024/10/22", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/rabby-mobile/blob/develop/docs/Cure53%20-%20Debank%20Rabby%20Wallet%20Audit%20Report.pdf",
  },
  {
    company: "slowmist",
    product: "mobile",
    date: "2024/10/23", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/rabby-mobile/blob/develop/docs/SlowMist%20Audit%20Report%20-%20Rabby%20mobile%20wallet%20iOS.pdf",
  },
  {
    company: "slowmist",
    product: "desktop",
    date: "2023/09/26", // format: YYYY/MM/DD
    reportUrl:
      "https://github.com/RabbyHub/RabbyDesktop/blob/publish/prod/docs/SlowMist%20Audit%20Report%20-%20Rabby%20Wallet%20Desktop.pdf",
  },
];

function extractUniqueYears(dataArray) {
  const years = dataArray.map((item) => {
    const dateParts = item.date.split("/");
    return dateParts[0];
  });
  const uniqueYears = [...new Set(years)];
  return uniqueYears.sort((a, b) => Number(a) - Number(b)).reverse();
}

const years = extractUniqueYears(audits);
const Security = () => {
  const [currentYear, setCurrentYear] = useState(years[0]);
  
  const displayAudits = audits.filter((audit) => {
    const year = audit.date.split("/")[0];
    return Number(year) === Number(currentYear);
  }).sort((a, b) => {
    const n1 = a.date.replace(/\//g, '');
    const n2 = b.date.replace(/\//g, '');
    return n2 - n1;
  });

  const handleClickYear = (year) => {
    setCurrentYear(year);
  };

  const openUrl = (url) => {
    window.open(url, '_blank');
  }

  return (
    <div className="security">
      <h2 className="title">Security over user experience</h2>
      <div className="security-content">
        <div className="container">
          <p className="subtitle">
            We make Rabby Wallet open-source, enabling anyone to review the code
            for security and functionality. Rabby Wallet undergoes regular
            audits by reputable third-party security firms to ensure the highest
            standards of protection.
          </p>
          <div className="year-select">
            {years.map((year) => (
              <a
                href="javascript:void(0)"
                key={year}
                onClick={() => handleClickYear(year)}
                className={clsx({ active: year === currentYear })}
              >
                {year}
              </a>
            ))}
          </div>
          <div className="audit-list">
            <div className="complete">
              <img
                src="/assets/images/security/audit-complete.svg"
                className="icon-audit-complete"
              />
              Audit Completed
            </div>
            {displayAudits.map((item) => (
              <div
                className="audit-item"
                key={`${item.company}-${item.date}-${item.product}`}
              >
                <img
                  className="audit-company-logo"
                  src={securityCompany[item.company].logo}
                  alt=""
                />
                <div className="audit-company-info">
                  <div className="top">
                    {securityCompany[item.company].name}
                    <img
                      className="audit-company-website"
                      src="/assets/images/security/website.svg"
                      alt=""
                      onClick={() => openUrl(securityCompany[item.company].url)}
                    />
                    <img
                      className="audit-company-twitter"
                      src="/assets/images/security/twitter.svg"
                      alt=""
                      onClick={() => openUrl(securityCompany[item.company].twitter)}
                    />
                  </div>
                  <div className="bottom">
                    <div className="box">
                      <img src="/assets/images/security/time.svg" alt="" />
                      {item.date}
                    </div>
                    <div className="box">
                      <img
                        src={`/assets/images/security/${item.product}.svg`}
                        alt=""
                      />
                      {getProductName(item.product)}
                    </div>
                  </div>
                </div>
                <div className="audit-company-report">
                  <a href={item.reportUrl} target="_blank">
                    View Report
                    <img
                      src="/assets/images/security/external-link.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
