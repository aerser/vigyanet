document.addEventListener('DOMContentLoaded', () => {
    const tweetButton = document.getElementById('tweetButton');
    const tweetContent = document.getElementById('tweetContent');
    const tweetsContainer = document.getElementById('tweets');
    const notificationLink = document.getElementById('notificationLink');
    const messageLink = document.getElementById('messageLink');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');
    const authModal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');

    let isLoggedIn = false;

    // ツイートの投稿
    tweetButton.addEventListener('click', () => {
        const content = tweetContent.value.trim();
        if (content) {
            const tweetElement = document.createElement('div');
            tweetElement.classList.add('tweet');
            tweetElement.innerHTML = `
                <div class="tweet-header">
                    <span class="user">あなた</span>
                    <span class="handle">@your_handle</span>
                    <span class="time">今</span>
                </div>
                <div class="tweet-content">${content}</div>
            `;
            tweetsContainer.prepend(tweetElement);
            tweetContent.value = '';
        }
    });

    // 通知の表示
    notificationLink.addEventListener('click', () => {
        alert('新しい通知はありません。');
    });

    // メッセージの送信
    messageLink.addEventListener('click', () => {
        const message = prompt('メッセージを入力してください:');
        if (message) {
            alert(`メッセージ: "${message}" が送信されました。`);
        }
    });

    // ログインボタンのクリック
    loginButton.addEventListener('click', () => {
        authTitle.textContent = 'ログイン';
        authModal.style.display = 'block';
    });

    // 新規登録ボタンのクリック
    registerButton.addEventListener('click', () => {
        authTitle.textContent = '新規登録';
        authModal.style.display = 'block';
    });

    // モーダルを閉じる
    closeModal.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // フォームの送信
    authForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (authTitle.textContent === 'ログイン') {
            // ログイン処理
            // ここにバックエンドとの連携コードを追加
            isLoggedIn = true;
            alert('ログイン成功');
        } else {
            // 新規登録処理
            // ここにバックエンドとの連携コードを追加
            alert('新規登録成功');
        }

        authModal.style.display = 'none';
        updateAuthButtons();
    });

    // ログアウトボタンのクリック
    logoutButton.addEventListener('click', () => {
        isLoggedIn = false;
        alert('ログアウトしました');
        updateAuthButtons();
    });

    function updateAuthButtons() {
        if (isLoggedIn) {
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
        } else {
            loginButton.style.display = 'inline-block';
            registerButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
        }
    }

    updateAuthButtons();
});
