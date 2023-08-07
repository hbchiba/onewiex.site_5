var jwtToken = localStorage.getItem('jwtToken');

// if (!jwtToken) {
//   // alert('Token missing. Please log in.');
//   window.location.href = 'index.html'; // Redirect to login page
// } else {
//   fetch('http://127.0.0.1:5000/account', {
//     method: 'GET',
//     headers: {
//       Authorization: jwtToken,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         // Access granted, show the protected content
//         document.getElementById('protectedContent').style.display = 'block';
//         document.getElementById('protectedHeader').style.display = 'none';
//       } else {
//         alert('Access denied. Please log in.');
//         window.location.href = 'index.html'; // Redirect to login page
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       alert('An error occurred');
//     });

//   fetch('http://127.0.0.1:5000/balances', {
//     method: 'GET',
//     headers: {
//       Authorization: jwtToken,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         window.bitcoinBalance = data.balances.bitcoin;
//         window.ethereumBalance = data.balances.ethereum;
//         window.binanceCoinBalance = data.balances.binance_coin;
//         window.tronBalance = data.balances.tron;
//         window.usdBalance = data.balances.usd;

//         // Use the balance values as needed
//         console.log('Bitcoin balance:', bitcoin);
//         console.log('Ethereum balance:', ethereum);
//         console.log('Binance Coin balance:', binanceCoin);
//         console.log('Tron balance:', tron);
//         console.log('USD balance:', usd);
//       } else {
//         alert('Access denied. Please log in.');
//         window.location.href = 'index.html'; // Redirect to login page
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       alert('An error occurred');
//     });
// }

if (!jwtToken) {
  // Token missing, redirect to login page
  window.location.href = 'index.html';
} else {
  // Function to handle fetch requests and error handling
  function handleFetch(url, onSuccess) {
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: jwtToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onSuccess(data);
        } else {
          alert('Access denied. Please log in.');
          window.location.href = 'index.html'; // Redirect to login page
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  }

  // Fetch balance information
  handleFetch('http://127.0.0.1:5000/account', (data) => {
    document.getElementById('protectedContent').style.display = 'block';
    document.getElementById('protectedHeader').style.display = 'none';

    const bitcoinBalance = data.balances.bitcoin;
    const ethereumBalance = data.balances.ethereum;
    const binanceCoinBalance = data.balances.binance_coin;
    const tronBalance = data.balances.tron;
    const usdBalance = data.balances.usd;
    const solBalance = data.balances.sol;

    // User Info
    const userInfo = data.user_info;
    const username = userInfo.username;
    const fullName = userInfo.full_name;
    const email = userInfo.email;
    const country = userInfo.country;
    const phoneNumber = userInfo.phone_number;
    const telegram = userInfo.telegram;
    const facebook = userInfo.facebook;
    const instagram = userInfo.instagram;
    const whatsapp = userInfo.whatsapp;
    const wechat = userInfo.wechat;
    const bitcoinWallet = userInfo.bitcoin_wallet;
    const ethBscWallet = userInfo.eth_bsc_wallet;
    const trxWallet = userInfo.trx_wallet;
    const onewiexSite = userInfo.onewiex_site;

    // Set account information
    const usdBalanceElement = document.getElementById('usd-balance');
    const btcBalanceElement = document.getElementById('btc-balance');
    const ethBalanceElement = document.getElementById('eth-balance');
    const tronBalanceElement = document.getElementById('tron-balance');
    const bnbBalanceElement = document.getElementById('bnb-balance');
    // const solBalanceElement = document.getElementById('sol-balance');

    const openADepositUsdElement =
      document.getElementById('open-a-deposit-usd');
    const openADepositBtcElement =
      document.getElementById('open-a-deposit-btc');
    const openADepositEthElement =
      document.getElementById('open-a-deposit-eth');
    const openADepositTronElement = document.getElementById(
      'open-a-deposit-tron'
    );
    // const openADepositSolElement =
    //   document.getElementById('open-a-deposit-sol');
    const openADepositBnbElement =
      document.getElementById('open-a-deposit-bnb');

    const sideBarFullname = document.getElementById('side-bar-full-name');
    sideBarFullname.innerText = fullName;

    const accountFullname = document.getElementById('account-fullname');
    const accountUsername = document.getElementById('account-username');
    const accountEmail = document.getElementById('account-email');
    const accountPhone = document.getElementById('account-phone');
    const accountCountry = document.getElementById('account-country');
    const accountTelegram = document.getElementById('account-telegram');
    const accountFacebook = document.getElementById('account-facebook');
    const accountInstagram = document.getElementById('account-instagram');
    const accountWhatsapp = document.getElementById('account-whatsapp');
    // const accountYoutube = document.getElementById('account-youtube');
    const accountWechat = document.getElementById('account-wechat');

    accountFullname.value = fullName;
    accountUsername.value = username;
    accountEmail.value = email;
    accountPhone.value = phoneNumber;
    accountCountry.innerText = country;
    accountTelegram.value = telegram;
    accountFacebook.value = facebook;
    accountInstagram.value = instagram;
    accountWhatsapp.value = whatsapp;
    // accountYoutube.innerText = youtube;
    accountWechat.value = wechat;

    usdBalanceElement.innerText = usdBalance;
    btcBalanceElement.innerText = bitcoinBalance;
    ethBalanceElement.innerText = ethereumBalance;
    tronBalanceElement.innerText = tronBalance;
    // solBalanceElement.innerText = solBalance;
    bnbBalanceElement.innerText = binanceCoinBalance;

    openADepositUsdElement.innerText = usdBalance;
    openADepositBtcElement.innerText = bitcoinBalance;
    openADepositEthElement.innerText = ethereumBalance;
    openADepositTronElement.innerText = tronBalance;
    // openADepositSolElement.innerText = solBalance;
    openADepositBnbElement.innerText = binanceCoinBalance;
  });
}

// Function to load and insert HTML content
function insertHTML(elementId, filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((content) => {
      document.getElementById(elementId).innerHTML = content;
      console.log(`Content inserted into element with ID: ${elementId}`);
    })
    .catch((error) => {
      console.error(`Error fetching or inserting content: ${elementId}`);
    });
}

// Load header and footer
// insertHTML('account-detail', 'components/account-detail.html');
insertHTML(
  'account-settings-detail',
  'components/account-settings-detail.html'
);
// insertHTML('account-side-bar', 'components/account-side-bar.html');
//   insertHTML('add-funds-detail', 'components/add-funds-detail.html');
insertHTML(
  'currency-exchange-detail',
  'components/currency-exchange-detail.html'
);
insertHTML('documents-detail', 'components/documents-detail.html');
// insertHTML('my-deposit-detail', 'components/my-deposit-detail.html');
insertHTML('my-partners-detail', 'components/my-partners-detail.html');
// insertHTML('open-a-deposit-detail', 'components/open-a-deposit-detail.html');
insertHTML(
  'partner-statistics-detail',
  'components/partner-statistics-detail.html'
);
insertHTML('promo-detail', 'components/promo-detail.html');
insertHTML(
  'transaction-history-detail',
  'components/transaction-history-detail.html'
);

insertHTML('withdraw-funds-detail', 'components/withdraw-funds-detail.html');

function logout() {
  // Clear any session data or tokens
  localStorage.removeItem('jwtToken'); // Clear JWT token from local storage

  // Redirect the user to the login page
  window.location.href = 'index.html';
}
const accountDetail = document.getElementById('account-detail');
const addFundsDetail = document.getElementById('add-funds-detail');
const openADepositDetail = document.getElementById('open-a-deposit-detail');
const withdrawFundsDetail = document.getElementById('withdraw-funds-detail');
const currencyExchangeDetail = document.getElementById(
  'currency-exchange-detail'
);
const myDepositsDetail = document.getElementById('my-deposit-detail');
const transactionHistoryDetail = document.getElementById(
  'transaction-history-detail'
);
const myPartnersDetail = document.getElementById('my-partners-detail');
const partnerStatsticsDetail = document.getElementById(
  'partner-statistics-detail'
);
const promoDetail = document.getElementById('promo-detail');
const documentsDetail = document.getElementById('documents-detail');
const accountSettingsDetail = document.getElementById(
  'account-settings-detail'
);

function hiddenAllDetail() {
  accountDetail.style.display = 'none';
  addFundsDetail.style.display = 'none';
  openADepositDetail.style.display = 'none';
  withdrawFundsDetail.style.display = 'none';
  currencyExchangeDetail.style.display = 'none';
  myDepositsDetail.style.display = 'none';
  transactionHistoryDetail.style.display = 'none';
  myPartnersDetail.style.display = 'none';
  promoDetail.style.display = 'none';
  partnerStatsticsDetail.style.display = 'none';
  documentsDetail.style.display = 'none';
  accountSettingsDetail.style.display = 'none';
}

function show(element) {
  element.style.display = 'block';
}

function hidden(element) {
  element.style.display = 'none';
}

function setActiveLink(linkId) {
  const links = document.querySelectorAll('.cab-menu a');
  links.forEach((link) => {
    if (link.id === linkId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Call this function when a link is clicked
function handleLinkClick(linkId) {
  setActiveLink(linkId);

  switch (linkId) {
    case 'account-link':
      hiddenAllDetail();
      show(accountDetail);
      break;
    case 'add-funds-link':
      show(addFundsDetail);
      break;
    case 'open-a-deposit-link':
      hiddenAllDetail();
      show(openADepositDetail);
      break;
    case 'withdraw-funds-link':
      show(withdrawFundsDetail);
      break;
    case 'currency-exchange-link':
      show(currencyExchangeDetail);
      break;
    case 'my-deposits-link':
      hiddenAllDetail();
      show(myDepositsDetail);
      break;
    case 'transaction-history-link':
      hiddenAllDetail();
      show(transactionHistoryDetail);
      break;
    case 'my-partners-link':
      hiddenAllDetail();
      show(myPartnersDetail);
      break;
    case 'promo-link':
      hiddenAllDetail();
      show(promoDetail);
      break;
    case 'partner-statistics-link':
      hiddenAllDetail();
      show(partnerStatsticsDetail);
      break;
    case 'documents-link':
      hiddenAllDetail();
      show(documentsDetail);
      break;
    case 'account-settings-link':
      hiddenAllDetail();
      show(accountSettingsDetail);
      break;
    case 'live-trading-link':
      window.open('https://trading-onewiex.com/', '_blank');
  }
}
