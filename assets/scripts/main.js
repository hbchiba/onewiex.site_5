BACKEND_URL = 'http://127.0.0.1:8002';

let SELECTED_BALANCE = 'USD',
  SELECTED_TOKEN = 'BTC',
  SELECTED_NETWORK = 'ERC20',
  BITCOIN_ADDRESS,
  BITCOIN_QR,
  ETH_BSC_ADDRESS,
  ETH_BSC_QR,
  TRX_ADDRESS,
  TRX_QR,
  SELECTED_DEPOSIT_OFFER = 'USD Assets',
  SELECTED_DEPOSIT_PLAN = 'USD Quantum',
  SELECTED_ASSET = 'USD Assets',
  SELECTED_PLAN = 'USD Forex',
  SELECTED_DEPOSIT_BALANCE = 'USD',
  DEPOSIT_MIN = 0,
  DEPOSIT_MAX = 1000,
  INTEREST = 1.3,
  DEPOSIT_TERM = 16,
  DEPOSIT_ACCRUALS;

const openADepositDetail = document.getElementById('open-a-deposit-detail');

const depositTemplate = document.createElement('template');

depositTemplate.innerHTML = `
<div class="cab-content">
    <ng-component>
        <div class="cab-title mt-5 mt-lg-0">Account</div>

        <form
          novalidate="true"
          autocomplete="off"
          class="ng-untouched ng-pristine ng-valid"
        >
        <fieldset>
            <div class="cab-box">
            <img
                title="onewiex"
                src="assets/img/cab-icon-1.svg"
                alt="onewiex"
            />
            <h3>Open a deposit</h3>
            <div class="m-input__title">Choose offer</div>

            <div id="assets_select_pannel" class="m-radio">
                <!-- Add by javascript -->
            </div>

            <div class="m-input__title">Choose plan</div>

            <div class="cab-box__input">
                <div class="m-select">
                <div
                    class="jq-selectbox jqselect dropdown opened"
                    style="z-index: 10"
                >
                    <div
                    onclick="choose_plan_clicked()"
                    class="jq-selectbox__select"
                    >
                    <div
                        id="user_selected_plan"
                        class="jq-selectbox__select-text"
                    >
                        USD Forex
                    </div>
                    <div class="jq-selectbox__trigger">
                        <div
                        class="jq-selectbox__trigger-arrow"
                        ></div>
                    </div>
                    </div>
                    <div
                    class="jq-selectbox__dropdown"
                    style="
                        height: auto;
                        bottom: auto;
                        top: 53px;
                    "
                    >
                    <ul
                        id="plan_option"
                        style="max-height: 420px; display: none"
                    ></ul>
                    </div>
                </div>
                </div>
            </div>

            <div class="tariff-item single">
                <img
                title="onewiex"
                alt="onewiex"
                src="assets/img/usd-1.svg"
                />
                <div class="tariff-item__head">
                <h3>USD Forex</h3>
                </div>
                <div class="row">
                <div class="col-md-6">
                    <div class="tariff-item__info">
                    <div class="tariff-item__info-item">
                        <p>Accruals:</p>
                        <span id="accruals">Mon-Fri</span>
                    </div>
                    <div class="tariff-item__info-item">
                        <p>Deposit term:</p>
                        <span id="deposit_term">16 days</span>
                    </div>
                    <div class="tariff-item__info-item">
                        <p>Interest:</p>
                        <span id="interest">0.8 - 1.3%</span>
                    </div>

                    <div class="tariff-item__info-item">
                        <p>Amount:</p>
                        <span id="amount" class="text-upper"
                        >50 - 1,000 USD</span
                        >
                    </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="tariff-item__text">
                    <p>
                        USD Assets are investment portfolios that
                        guarantee a stable daily income in US
                        dollars from Monday to Friday. The main
                        capital will be available for withdrawal
                        at the end of the deposit term.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <div class="m-input__title">
                Paying from balance
            </div>

            <div class="cab-wallets">
                <label>
                <div class="cab-wallets__item">
                    <div class="cab-wallets__icon">
                    <svg>
                        <use
                        xlink:href="assets/img/sprite.svg#usd-icon"
                        ></use>
                    </svg>
                    </div>
                    <h3>usd</h3>
                    <p id="open-a-deposit-usd">0</p>
                </div>
                </label>
                <label>
                <div class="cab-wallets__item">
                    <div class="cab-wallets__icon">
                    <svg>
                        <use
                        xlink:href="assets/img/sprite.svg#btc-icon"
                        ></use>
                    </svg>
                    </div>
                    <h3>btc</h3>
                    <p id="open-a-deposit-btc">0</p>
                </div>
                </label>
                <label>
                <div class="cab-wallets__item">
                    <div class="cab-wallets__icon">
                    <svg>
                        <use
                        xlink:href="assets/img/sprite.svg#eth-icon"
                        ></use>
                    </svg>
                    </div>
                    <h3>eth</h3>
                    <p id="open-a-deposit-eth">0</p>
                </div>
                </label>
                <label>
                <div class="cab-wallets__item">
                    <div class="cab-wallets__icon">
                    <svg>
                        <use
                        xlink:href="assets/img/sprite.svg#ltc-icon"
                        ></use>
                    </svg>
                    </div>
                    <h3>tron</h3>
                    <p id="open-a-deposit-tron">0</p>
                </div>
                </label>
                <label>
                <div class="cab-wallets__item">
                    <div class="cab-wallets__icon">
                    <svg>
                        <use
                        xlink:href="assets/img/sprite.svg#bnb-icon"
                        ></use>
                    </svg>
                    </div>
                    <h3>bnb</h3>
                    <p id="open-a-deposit-bnb">0</p>
                </div>
                </label>
            </div>

            <div class="cab-box__input">
                <div class="m-input__head">
                <div class="m-input__title">Deposit amount</div>
                <div class="m-input__title">
                    min 50 - max 1,000 USD
                </div>
                </div>
                <label class="m-input"
                ><input
                    type="text"
                    formcontrolname="amount"
                    maxlength="18"
                    placeholder="0.00"
                    class="ng-untouched ng-pristine ng-valid"
                /><span class="text-upper">usd</span></label
                >
            </div>
            <div class="cab-modal__info">
                <div class="cab-modal__info-item">
                <h3>Balance after operation:</h3>
                <p class="text-upper negative">
                    -50 <span>usd</span>
                </p>
                </div>
                <div class="cab-modal__info-item">
                <h3>Expire date:</h3>
                <p>28/08/2023 <span>14:46</span></p>
                </div>
                <div class="cab-modal__info-item">
                <h3>Total profit:</h3>
                <p class="text-upper">60.4 usd</p>
                </div>
            </div>
            <button
                class="m-btn tr"
                onclick="handleLinkClick('add-funds-link')"
            >
                Open deposit
            </button>
            </div>
        </fieldset>
        </form>
    </ng-component>
</div>
`;

// if (openADepositDetail) {
//   openADepositDetail.appendChild(depositTemplate.content.cloneNode(true));
// }

const payingFromBalanceUsd = document.getElementById('paying-from-balance-usd');
const payingFromBalanceBtc = document.getElementById('paying-from-balance-btc');
const payingFromBalanceEth = document.getElementById('paying-from-balance-eth');
const payingFromBalanceTron = document.getElementById(
  'paying-from-balance-tron'
);

function selectPayingFromBalance(event) {
  payingFromBalanceBnb.classList.remove('active');
  payingFromBalanceTron.classList.remove('active');
  payingFromBalanceEth.classList.remove('active');
  payingFromBalanceBtc.classList.remove('active');

  event.currentTarget.classList.add('active');

  const crypto = event.currentTarget.querySelector('h3').textContent;
  SELECTED_DEPOSIT_BALANCE = crypto.toUpperCase();

  updateDepositInformation();
}

const payingFromBalanceBnb = document.getElementById('paying-from-balance-bnb');
function togglePayingFromBalance(currency) {
  if (currency == 'usd') {
    payingFromBalanceUsd.style.display = 'block';
    payingFromBalanceBtc.style.display = 'none';
    payingFromBalanceEth.style.display = 'none';
    payingFromBalanceTron.style.display = 'none';
    payingFromBalanceBnb.style.display = 'none';
  } else {
    payingFromBalanceUsd.style.display = 'none';
    payingFromBalanceBtc.style.display = 'block';
    payingFromBalanceEth.style.display = 'block';
    payingFromBalanceTron.style.display = 'block';
    payingFromBalanceBnb.style.display = 'block';
  }
}

function inputDepositAmount(event) {
  const inputElement = event.currentTarget;
  const inputValue = inputElement.value.trim();

  // Convert the entered value to an integer
  const intValue = parseInt(inputValue, 10);

  // If the entered value is a valid integer, update the input field value
  if (!isNaN(intValue)) {
    inputElement.value = intValue;
  } else {
    inputElement.value = '';
  }
}

// togglePayingFromBalance('usd');

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

const chooseOfferAssets = ['USD Assets', 'Crypto Assets', 'Venture Assets'];

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

const assetSelectPannel = document.getElementById('assets-select-pannel');

const choosePlanDropList = document.getElementById('choose-plan-drop-list');
const userSelectedPlan = document.getElementById('user-selected-plan');

const selectedPlanElement = document.getElementById('selected-plan');
const accrualsElement = document.getElementById('accruals');
const depositTermElement = document.getElementById('deposit-term');
const interestElement = document.getElementById('interest');
const amountElement = document.getElementById('amount');
const detailElement = document.getElementById('detail');
const depositMinMaxElement = document.getElementById('deposit-min-max');
const depositCurrencyElement = document.getElementById('deposit-currency');

function update_deposit_min_max() {
  depositCurrencyElement.innerText = SELECTED_DEPOSIT_BALANCE;
  if (SELECTED_DEPOSIT_PLAN == 'Crypto Light') {
    switch (SELECTED_DEPOSIT_BALANCE) {
      case 'BTC':
        depositMinMaxElement.innerText = 'min 0.005 - max 10 BTC';
        amountElement.innerText = '0.005 - 10 BTC';
        break;
      case 'ETH':
        depositMinMaxElement.innerText = 'min 0.1 - max 100 ETH';
        amountElement.innerText = '0.1 - 100 ETH';
        break;
      case 'TRON':
        depositMinMaxElement.innerText = 'min 2K - max 2M TRX';
        amountElement.innerText = '2K - 2M TRX';
        break;
      case 'BNB':
        depositMinMaxElement.innerText = 'min 1 - max 1K BNB';
        amountElement.innerText = '1 - 1K BNB';
        break;
    }
  } else {
    switch (SELECTED_DEPOSIT_BALANCE) {
      case 'BTC':
        depositMinMaxElement.innerText = 'min 10 - max 100 BTC';
        amountElement.innerText = '10 - 100 BTC';
        break;
      case 'ETH':
        depositMinMaxElement.innerText = 'min 100 - max 1000 ETH';
        amountElement.innerText = '100 - 1000 ETH';
        break;
      case 'TRON':
        depositMinMaxElement.innerText = 'min 2M - max 200M TRX';
        amountElement.innerText = '2M - 200M TRX';
        break;
      case 'BNB':
        depositMinMaxElement.innerText = 'min 1K - max 1M BNB';
        amountElement.innerText = '1K - 1M BNB';
        break;
    }
  }
}

function setPannelInformation() {
  selectedPlanElement.innerText = SELECTED_PLAN;
  accrualsElement.innerText = DEPOSIT_ACCRUALS;
  depositTermElement.innerText = `${DEPOSIT_TERM} days`;
  interestElement.innerText = `${INTEREST} %`;
  amountElement.innerText = `${DEPOSIT_MIN.toLocaleString()} - ${DEPOSIT_MAX.toLocaleString()} ${SELECTED_DEPOSIT_BALANCE}`;

  if (SELECTED_PLAN == 'USD Assets') {
    detailElement.innerText =
      'USD Assets are investment portfolios that guarantee a stable daily income in US dollars from Monday to Friday. The main capital will be available for withdrawal at the end of the deposit term.';
  } else if (SELECTED_PLAN == 'Venture Assets') {
    detailElement.innerText =
      "Venture Assets are investment portfolios that guarantee stable income on a long-term basis. Interest accruals are displayed in the partner's account daily, but capital and profit are available for withdrawal at the end of the term of the deposit plan";
  } else {
    detailElement.innerText =
      'CRYPTO Assets are cryptocurrency portfolios that guarantee a stable daily income in cryptocurrency (in BTC,LTC,ETH,SOL) from Monday to Friday. The main capital at the end of the deposit period will not be returned';
  }
  depositMinMaxElement.innerText = `min ${DEPOSIT_MIN.toLocaleString()} - max ${DEPOSIT_MAX.toLocaleString()} ${SELECTED_BALANCE}`;
}

function addChoosePlanDropList() {
  choosePlanDropList.innerHTML = '';
  var asset = SELECTED_ASSET.split(' ')[0].toLowerCase();
  var assetList = planByAssets[asset];
  SELECTED_PLAN = assetList[0];
  userSelectedPlan.innerText = SELECTED_PLAN;

  assetList.forEach((asset) => {
    const option = document.createElement('li');
    option.innerText = asset;

    option.addEventListener('click', () => {
      SELECTED_PLAN = asset;
      choosePlanDropList.style.display = 'none';
      userSelectedPlan.innerText = SELECTED_PLAN;
      updateDepositInformation();
    });

    choosePlanDropList.appendChild(option);
  });
}

addChoosePlanDropList();

chooseOfferAssets.forEach((asset, index) => {
  const label = document.createElement('label');
  label.innerHTML = `<span>${asset}</span>`;

  if (index == 0) {
    label.classList.add('active');
  }

  label.addEventListener('click', () => {
    SELECTED_ASSET = asset;
    const allLabels = assetSelectPannel.querySelectorAll('label');
    allLabels.forEach((label) => {
      label.classList.remove('active');
    });
    label.classList.add('active');

    addChoosePlanDropList();

    switch (SELECTED_ASSET) {
      case 'Crypto Assets':
        SELECTED_DEPOSIT_BALANCE = 'BTC';
        togglePayingFromBalance('other');
        depositCurrencyElement.innerText = 'BTC';

        payingFromBalanceBtc.classList.remove('active');
        payingFromBalanceBnb.classList.remove('active');
        payingFromBalanceTron.classList.remove('active');
        payingFromBalanceEth.classList.remove('active');
        payingFromBalanceBtc.classList.add('active');
        break;
      case 'Venture Assets':
        SELECTED_DEPOSIT_BALANCE = 'USD';
        togglePayingFromBalance('usd');
        depositCurrencyElement.innerText = 'USD';
        break;
      default:
        SELECTED_DEPOSIT_BALANCE = 'USD';
        togglePayingFromBalance('usd');
        depositCurrencyElement.innerText = 'USD';
    }

    updateDepositInformation();
  });

  assetSelectPannel.appendChild(label);
});

function choose_plan_clicked() {
  if (choosePlanDropList.style.display == 'none') {
    choosePlanDropList.style.display = 'block';
  } else {
    choosePlanDropList.style.display = 'none';
  }
}
const radioGroup = document.getElementById('radio-group');

const labels = radioGroup.getElementsByTagName('label');
for (const label of labels) {
  label.addEventListener('click', () => {
    for (const otherLabel of labels) {
      otherLabel.classList.remove('active');
    }
    label.classList.add('active');
  });
}

function updateDepositInformation() {
  switch (SELECTED_ASSET) {
    case 'USD Assets':
      switch (SELECTED_PLAN) {
        case 'USD Forex':
          DEPOSIT_TERM = 16;
          INTEREST = 1.3;
          DEPOSIT_MIN = 50;
          DEPOSIT_MAX = 1000;
          SELECTED_DEPOSIT_BALANCE = 'USD';
          DEPOSIT_ACCRUALS = 'Mon-Fri';
          break;
        case 'USD Futures':
          DEPOSIT_TERM = 24;
          INTEREST = 1.6;
          DEPOSIT_MIN = 1001;
          DEPOSIT_MAX = 10000;
          SELECTED_DEPOSIT_BALANCE = 'USD';
          DEPOSIT_ACCRUALS = 'Mon-Fri';
          break;
        case 'USD Crypto':
          DEPOSIT_TERM = 34;
          INTEREST = 2;
          DEPOSIT_MIN = 10001;
          DEPOSIT_MAX = 50000;
          SELECTED_DEPOSIT_BALANCE = 'USD';
          DEPOSIT_ACCRUALS = 'Mon-Fri';
          break;
        case 'USD Altcoins':
          DEPOSIT_TERM = 46;
          INTEREST = 2.6;
          DEPOSIT_MIN = 500001;
          DEPOSIT_MAX = 250000;
          SELECTED_DEPOSIT_BALANCE = 'USD';
          DEPOSIT_ACCRUALS = 'Mon-Fri';
          break;
        case 'USD Quantum':
          DEPOSIT_TERM = 52;
          INTEREST = 3;
          DEPOSIT_MIN = 2500001;
          DEPOSIT_MAX = 1000000;
          SELECTED_DEPOSIT_BALANCE = 'USD';
          DEPOSIT_ACCRUALS = 'Mon-Fri';
          break;
      }
      break;
    case 'Crypto Assets':
      switch (SELECTED_PLAN) {
        case 'Crypto Light':
          switch (SELECTED_DEPOSIT_BALANCE) {
            case 'BTC':
              DEPOSIT_TERM = 100;
              INTEREST = 2.2;
              DEPOSIT_MIN = 0.005;
              DEPOSIT_MAX = 10;
              SELECTED_DEPOSIT_BALANCE = 'BTC';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'ETH':
              DEPOSIT_TERM = 100;
              INTEREST = 2.2;
              DEPOSIT_MIN = 0.1;
              DEPOSIT_MAX = 100;
              SELECTED_DEPOSIT_BALANCE = 'ETH';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'TRX':
              DEPOSIT_TERM = 100;
              INTEREST = 2.2;
              DEPOSIT_MIN = 2000;
              DEPOSIT_MAX = 2000000;
              SELECTED_DEPOSIT_BALANCE = 'TRX';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'TRON':
              DEPOSIT_TERM = 100;
              INTEREST = 2.2;
              DEPOSIT_MIN = 2000;
              DEPOSIT_MAX = 2000000;
              SELECTED_DEPOSIT_BALANCE = 'TRX';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'BNB':
              DEPOSIT_TERM = 100;
              INTEREST = 2.2;
              DEPOSIT_MIN = 0.5;
              DEPOSIT_MAX = 1000;
              SELECTED_DEPOSIT_BALANCE = 'BNB';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
          }
          break;
        case 'Crypto Pro':
          switch (SELECTED_DEPOSIT_BALANCE) {
            case 'BTC':
              DEPOSIT_TERM = 100;
              INTEREST = 2.8;
              DEPOSIT_MIN = 10;
              DEPOSIT_MAX = 100;
              SELECTED_DEPOSIT_BALANCE = 'BTC';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'ETH':
              DEPOSIT_TERM = 100;
              INTEREST = 2.8;
              DEPOSIT_MIN = 100;
              DEPOSIT_MAX = 1000;
              SELECTED_DEPOSIT_BALANCE = 'ETH';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'TRON':
              DEPOSIT_TERM = 100;
              INTEREST = 2.8;
              DEPOSIT_MIN = 2000000;
              DEPOSIT_MAX = 20000000;
              SELECTED_DEPOSIT_BALANCE = 'TRX';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'TRX':
              DEPOSIT_TERM = 100;
              INTEREST = 2.8;
              DEPOSIT_MIN = 2000000;
              DEPOSIT_MAX = 20000000;
              SELECTED_DEPOSIT_BALANCE = 'TRX';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
            case 'BNB':
              DEPOSIT_TERM = 100;
              INTEREST = 2.8;
              DEPOSIT_MIN = 1000;
              DEPOSIT_MAX = 10000;
              SELECTED_DEPOSIT_BALANCE = 'BNB';
              DEPOSIT_ACCRUALS = 'Mon-Fri';
              break;
          }
          break;
      }
      break;
    case 'Venture Assets':
      switch (SELECTED_PLAN) {
        case 'Venture Light':
          DEPOSIT_TERM = 200;
          INTEREST = 3;
          DEPOSIT_MIN = 500;
          DEPOSIT_MAX = 50000;
          SELECTED_DEPOSIT_BALANCE = 'USD';
          DEPOSIT_ACCRUALS = 'Everyday';
          break;
        case 'Venture Superiority':
          DEPOSIT_TERM = 360;
          INTEREST = 3.4;
          DEPOSIT_MIN = 50000;
          DEPOSIT_MAX = 500000;
          SELECTED_DEPOSIT_BALANCE = 'USD';
          DEPOSIT_ACCRUALS = 'Everyday';
          break;
      }
      break;
  }

  setPannelInformation();

  console.log(`Assets: ${SELECTED_ASSET}`);
  console.log(`Plan: ${SELECTED_PLAN}`);
  console.log(`Pay balance: ${SELECTED_DEPOSIT_BALANCE}`);
  console.log(DEPOSIT_TERM);
  console.log(INTEREST);
  console.log(DEPOSIT_MIN);
  console.log(DEPOSIT_MAX);
  console.log(DEPOSIT_ACCRUALS);
}
