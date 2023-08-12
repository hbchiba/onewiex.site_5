// BACKEND_URL = 'http://127.0.0.1:5000';
BACKEND_URL = 'http://127.0.0.1:8002';

let SELECTED_BALANCE = 'USD',
  SELECTED_TOKEN = 'BTC',
  SELECTED_NETWORK = 'ERC20',
  BITCOIN_ADDRESS,
  BITCOIN_QR,
  ETH_BSC_ADDRESS,
  ETH_BSC_QR,
  TRX_ADDRESS,
  TRX_QR;

var jwtToken = localStorage.getItem('jwtToken');
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
  handleFetch(`${BACKEND_URL}/account`, (data) => {
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
    BITCOIN_ADDRESS = userInfo.bitcoin_wallet;
    BITCOIN_QR = userInfo.bitcoin_qr;
    ETH_BSC_ADDRESS = userInfo.eth_bsc_wallet;
    ETH_BSC_QR = userInfo.eth_bsc_qr;
    TRX_ADDRESS = userInfo.trx_wallet;
    TRX_QR = userInfo.trx_qr;

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

    const bicoinAddressElement = document.getElementById('j');

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
      // console.log(`Content inserted into element with ID: ${elementId}`);
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

const addFundsDetailsElement = document.getElementById('add-funds-detail');
const usdBalanceSelectTokenElement = document.getElementById(
  'usd-balance-select-token'
);
const addFundsAddressElement = document.getElementById('add-funds-address');
const chooseNetworkElement = document.getElementById('choose-network');
const bep20 = document.getElementById('bep20');
const erc20 = document.getElementById('erc20');

const creditedElement = document.getElementById('credited');
const addFundsViaElement = document.getElementById('add-funds-via');
const addFundsWalletAddressElement = document.getElementById(
  'add-funds-wallet-address'
);
const addFundsWalletQrSpaceholderElement = document.getElementById(
  'add-funds-wallet-qr-spaceholder'
);
const withdrawFundsDetailElement = document.getElementById(
  'withdraw-funds-detail'
);
const currencyExchangeDetailElement = document.getElementById(
  'currency-exchange-detail'
);

function show(element) {
  element.style.display = 'block';
}

function hidden(element) {
  element.style.display = 'none';
}

function active(element) {
  element.classList.add('active');
}

function unActive(element) {
  element.classList.remove('active');
}

function setText(element, text) {
  element.innerText = text;
}

function chooseBalance(event) {
  var allLabels = document.querySelectorAll('.m-radio label');
  for (var i = 0; i < allLabels.length; i++) {
    allLabels[i].classList.remove('active');
  }

  var clickedLabel = event.target.parentElement;
  clickedLabel.classList.add('active');

  SELECTED_BALANCE = event.target.innerText;

  if (SELECTED_BALANCE == 'USD') {
    hidden(addFundsAddressElement);
    show(usdBalanceSelectTokenElement);
  } else {
    addFunds();
  }

  updateDisplayChooseNetwork();
}

function chooseToken(event) {
  var allLabels = document.querySelectorAll('.cab-wallets label');
  for (var i = 0; i < allLabels.length; i++) {
    allLabels[i].classList.remove('active');
  }

  var clickedLabel = event.currentTarget;
  clickedLabel.classList.add('active');

  SELECTED_TOKEN = clickedLabel.querySelector('h3').innerText;
  SELECTED_NETWORK = 'ERC20';
  updateDisplayChooseNetwork();
}

function updateDisplayChooseNetwork() {
  if (SELECTED_BALANCE == 'USD') {
    if (SELECTED_TOKEN == 'USDT') {
      show(chooseNetworkElement);
      show(bep20);
      active(erc20);
    } else if (SELECTED_TOKEN == 'USDC') {
      show(chooseNetworkElement);
      hidden(bep20);
      active(erc20);
    } else {
      hidden(chooseNetworkElement);
    }
  }
}

function chooseNetwork(event) {
  var allLabels = document.querySelectorAll('#choose-network label');
  for (var i = 0; i < allLabels.length; i++) {
    allLabels[i].classList.remove('active');
  }

  var clickedLabel = event.currentTarget;
  clickedLabel.classList.add('active');

  SELECTED_NETWORK = clickedLabel.querySelector('p').innerText;
}

function setAddFundsViaText() {
  if (SELECTED_BALANCE == 'BTC') {
    setText(addFundsViaElement, 'Bitcoin');
  } else if (SELECTED_BALANCE == 'ETH') {
    setText(addFundsViaElement, 'Ethereum - ERC20');
  } else if (SELECTED_BALANCE == 'TRX') {
    setText(addFundsViaElement, 'Tron');
  } else if (SELECTED_BALANCE == 'BNB') {
    setText(addFundsViaElement, 'Binance - BNB');
  } else {
    if (SELECTED_TOKEN == 'BTC') {
      setText(addFundsViaElement, 'Bitcoin');
    } else if (SELECTED_TOKEN == 'ETH') {
      setText(addFundsViaElement, 'Ethereum - ERC20');
    } else if (SELECTED_TOKEN == 'TRX') {
      setText(addFundsViaElement, 'TRON');
    } else if (SELECTED_TOKEN == 'SOL') {
      setText(addFundsViaElement, 'Solana');
    } else if (SELECTED_TOKEN == 'TRX') {
      setText(addFundsViaElement, 'TRON - TRC20');
    } else if (SELECTED_TOKEN == 'TRX') {
      setText(addFundsViaElement, 'TRON - TRC20');
    } else if (SELECTED_TOKEN == 'USDT') {
      setText(addFundsViaElement, `Tether - ${SELECTED_NETWORK}`);
    } else if (SELECTED_TOKEN == 'USDC') {
      setText(addFundsViaElement, `USD Coin - ${SELECTED_NETWORK}`);
    } else if (SELECTED_TOKEN == 'BNB') {
      setText(addFundsViaElement, 'BNB - BEP20');
    } else if (SELECTED_TOKEN == 'BUSD') {
      setText(addFundsViaElement, 'Binance USD - BEP20');
    } else if (SELECTED_TOKEN == 'DAI') {
      setText(addFundsViaElement, 'Dai - ERC20');
    } else if (SELECTED_TOKEN == 'DAI') {
      setText(addFundsViaElement, 'Dai - ERC20');
    } else if (SELECTED_TOKEN == 'LINK') {
      setText(addFundsViaElement, 'Chainlink - ERC20');
    }
  }
}

function setAddFundsAddress() {
  if (SELECTED_BALANCE == 'BTC') {
    setText(addFundsWalletAddressElement, BITCOIN_ADDRESS);
    setAddFundQR(BITCOIN_QR);
  } else if (SELECTED_BALANCE == 'ETH') {
    setText(addFundsWalletAddressElement, ETH_BSC_ADDRESS);
    setAddFundQR(ETH_BSC_QR);
  } else if (SELECTED_BALANCE == 'TRX') {
    setText(addFundsWalletAddressElement, TRX_ADDRESS);
    setAddFundQR(TRX_QR);
  } else if (SELECTED_BALANCE == 'BNB') {
    setText(addFundsWalletAddressElement, ETH_BSC_ADDRESS);
    setAddFundQR(ETH_BSC_QR);
  } else {
    if (SELECTED_TOKEN == 'BTC') {
      setText(addFundsWalletAddressElement, BITCOIN_ADDRESS);
      setAddFundQR(BITCOIN_QR);
    } else if (
      SELECTED_TOKEN == 'ETH' ||
      SELECTED_TOKEN == 'BNB' ||
      SELECTED_TOKEN == 'BUSD' ||
      SELECTED_TOKEN == 'LINK'
    ) {
      setText(addFundsWalletAddressElement, ETH_BSC_ADDRESS);
      setAddFundQR(ETH_BSC_QR);
    } else if (SELECTED_TOKEN == 'TRX') {
      setText(addFundsWalletAddressElement, TRX_ADDRESS);
      setAddFundQR(TRX_QR);
    } else {
      if (SELECTED_NETWORK == 'ERC20') {
        setText(addFundsWalletAddressElement, ETH_BSC_ADDRESS);
        setAddFundQR(ETH_BSC_QR);
      } else if (SELECTED_NETWORK == 'TRC20') {
        setText(addFundsWalletAddressElement, TRX_ADDRESS);
        setAddFundQR(TRX_QR);
      } else if (SELECTED_NETWORK == 'BEP20') {
        setText(addFundsWalletAddressElement, ETH_BSC_ADDRESS);
        setAddFundQR(ETH_BSC_QR);
      }
    }
  }
}

function setAddFundQR(qrCodeSrc) {
  const qrCodeImage = document.createElement('img');
  qrCodeImage.src = `data:image/png;base64,${qrCodeSrc}`;
  while (addFundsWalletQrSpaceholderElement.firstChild) {
    addFundsWalletQrSpaceholderElement.removeChild(
      addFundsWalletQrSpaceholderElement.firstChild
    );
  }
  addFundsWalletQrSpaceholderElement.appendChild(qrCodeImage);
}

function addFunds() {
  hidden(usdBalanceSelectTokenElement);
  show(addFundsAddressElement);

  setText(creditedElement, `${SELECTED_BALANCE} Balance`);
  setAddFundsViaText();
  setAddFundsAddress();
}

function stepback() {
  if (SELECTED_BALANCE.toUpperCase() == 'USD') {
    show(usdBalanceSelectTokenElement);
    hidden(addFundsAddressElement);
  } else {
    closeAddFundsDetail();
  }
}

function closeAddFundsDetail() {
  hidden(addFundsDetailsElement);
}

function closeWithdrawFundsDetail() {
  hidden(withdrawFundsDetailElement);
}
function closeCurrencyExchange() {
  hidden(currencyExchangeDetailElement);
}
function copyToClipboard(button, id) {
  var walletAddress = document.getElementById(id);
  var range = document.createRange();
  range.selectNode(walletAddress);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  button.innerHTML = 'Copied!';
  button.style.color = 'white';

  setTimeout(function () {
    button.innerHTML =
      '<svg><use xlink:href="assets/img/sprite.svg#copy"></use></svg>';
  }, 2000);
}

function copyToClipboard_button(button, id) {
  var walletAddress = document.getElementById(id);
  var range = document.createRange();
  range.selectNode(walletAddress);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  button.innerHTML = 'Copied!';

  setTimeout(function () {
    button.innerHTML = 'Copy address';
  }, 2000);
}
let SELECTED_ASSET, SELECTED_PLAN;

const assets = ['USD Assets', 'Crypto Assets', 'Venture Assets'];

const planByAssets = {
  usd: [
    'USD Forex',
    'USD Futures',
    'USD Crypto',
    'USD Altcoins',
    'USD Quantum',
  ],
  crypto: ['Crypto Light', 'Crypto Pro'],
  venture: ['Venture Light', 'Venture Superiority'],
};

const assets_select_pannel = document.getElementById('assets_select_pannel');

const plan_option = document.getElementById('plan_option');
const user_selected_plan = document.getElementById('user_selected_plan');

const accrualsElement = document.getElementById('accruals');
const depositElement = document.getElementById('deposit_term');
const interestElement = document.getElementById('interest');
const amountElement = document.getElementById('amount');

function set_deposit_interest_amount(times, deposit, interest, amount) {
  accrualsElement.innerText = times;
  depositElement.innerText = deposit;
  interestElement.innerText = interest;
  amountElement.innerText = amount;
}

function update_deposit_information() {
  switch (SELECTED_PLAN) {
    case 'USD Forex':
      set_deposit_interest_amount(
        'Mon-Fri',
        '16 days',
        '0.8 - 1.3%',
        '50 - 1,000 USD'
      );
      break;
    case 'USD Futures':
      set_deposit_interest_amount(
        'Mon-Fri',
        '24 days',
        '1.2 - 1.6%',
        '1,001 - 10,000 USD'
      );
      break;
    case 'USD Crypto':
      set_deposit_interest_amount(
        'Mon-Fri',
        '34 days',
        '1.5 - 2%',
        '10,001 - 50,000 USD'
      );
      break;
    case 'USD Altcoins':
      set_deposit_interest_amount(
        'Mon-Fri',
        '46 days',
        '1.9 - 2.6%',
        '50,001 - 250,000 USD'
      );
      break;
    case 'USD Quantum':
      set_deposit_interest_amount(
        'Mon-Fri',
        '52 days',
        '2.5 - 3%',
        '250,001 - 1,000,000 USD'
      );
      break;
    case 'Crypto Light':
      set_deposit_interest_amount(
        'Mon-Fri',
        '100 days',
        '2.2%',
        '0.005 - 10 BTC'
      );
      break;
    case 'Crypto Pro':
      set_deposit_interest_amount(
        'Mon-Fri',
        '100 days',
        '2.8%',
        '10 - 100 BTC'
      );
      break;
    case 'Venture Light':
      set_deposit_interest_amount(
        'Everyday',
        '200 days',
        '3%',
        '500 - 50,000 USD'
      );
      break;
    case 'Venture Superiority':
      set_deposit_interest_amount(
        'Everyday',
        '360 days',
        '3.4%',
        '50,000 - 500,000 USD'
      );
      break;
  }
}

function add_option(asset) {
  var asset_list = planByAssets[asset];
  asset_list.forEach((a, index) => {
    const option = document.createElement('li');
    option.innerText = a;

    option.addEventListener('click', () => {
      SELECTED_PLAN = a;
      plan_option.style.display = 'none';
      user_selected_plan.innerText = a;
      update_deposit_information();
    });

    // Set the first option as selected by default
    if (index === 0) {
      option.classList.add('selected', 'sel');
      SELECTED_PLAN = a;
      user_selected_plan.innerText = a;
    }

    plan_option.appendChild(option);
  });
}

add_option('usd');
assets.forEach((asset, index) => {
  const label = document.createElement('label');
  label.innerHTML = `<span>${asset}</span>`;

  if (index == 0) {
    label.classList.add('active');
  }

  label.addEventListener('click', () => {
    SELECTED_ASSET = asset;
    const allLabels = assets_select_pannel.querySelectorAll('label');
    allLabels.forEach((label) => {
      label.classList.remove('active');
    });
    label.classList.add('active');

    plan_option.innerHTML = '';
    add_option(asset.split(' ')[0].toLowerCase());
    update_deposit_information();
  });

  assets_select_pannel.appendChild(label);
});

function choose_plan_clicked() {
  if (plan_option.style.display == 'none') {
    plan_option.style.display = 'block';
  } else {
    plan_option.style.display = 'none';
  }
}
// Get the radio group container element
const radioGroup = document.getElementById('radio-group');

// Add event listener to each label
const labels = radioGroup.getElementsByTagName('label');
for (const label of labels) {
  label.addEventListener('click', () => {
    // Remove 'active' class from all labels
    for (const otherLabel of labels) {
      otherLabel.classList.remove('active');
    }

    // Add 'active' class to the clicked label
    label.classList.add('active');
  });
}
