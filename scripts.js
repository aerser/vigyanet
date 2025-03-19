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
    const trendingContainer = document.getElementById('trending');
    const profileModal = document.getElementById('profileModal');
    const closeProfileModal = document.querySelector('.close-profile');
    const profileForm = document.getElementById('profileForm');

    let isLoggedIn = false;
    let tweets = [];

    // ツイートの投稿
    tweetButton.addEventListener('click', () => {
        const content = tweetContent.value.trim();
        if (content) {
            const tweet = {
                user: 'あなた',
                handle: '@your_handle',
                time: '今',
                content: content,
                likes: Math.floor(Math.random() * 100) // ランダムな「いいね」数を追加
            };
            tweets.push(tweet);
            updateTweets();
            tweetContent.value = '';
        }
    });

    // ツイートの更新
    function updateTweets() {
        tweetsContainer.innerHTML = '';
        tweets.sort((a, b) => b.likes - a.likes); // 「いいね」数でソート
        tweets.forEach(tweet => {
            const tweetElement = document.createElement('div');
            tweetElement.classList.add('tweet');
            tweetElement.innerHTML = `
                <div class="tweet-header">
                    <span class="user">${tweet.user}</span>
                    <span class="handle">${tweet.handle}</span>
                    <span class="time">${tweet.time}</span>
                </div>
                <div class="tweet-content">${tweet.content}</div>
                <div class="tweet-likes">${tweet.likes} いいね</div>
            `;
            tweetsContainer.appendChild(tweetElement);
        });
        updateTrending();
    }

    // トレンドの更新
    function updateTrending() {
        const trending = {};
        tweets.forEach(tweet => {
            const words = tweet.content.split(' ');
            words.forEach(word => {
                if (!trending[word]) {
                    trending[word] = 0;
                }
                trending[word]++;
            });
        });
        const sortedTrending = Object.entries(trending).sort((a, b) => b[1] - a[1]).slice(0, 10);
        trendingContainer.innerHTML = '';
        sortedTrending.forEach(([word, count]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${word} (${count})`;
            trendingContainer.appendChild(listItem);
        });
    }

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

    // プロフィール編集モーダルを開く
    document.querySelector('.sidebar ul li a[href="#"]').addEventListener('click', () => {
        profileModal.style.display = 'block';
    });

    // プロフィール編集モーダルを閉じる
    closeProfileModal.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // プロフィール編集フォームの送信
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const bio = document.getElementById('bio').value;
        const profilePic = document.getElementById('profilePic').files[0];
        const coverPhoto = document.getElementById('coverPhoto').files[0];

        // ここにプロフィール更新のバックエンドとの連携コードを追加

        alert('プロフィールが更新されました');
        profileModal.style.display = 'none';
    });
});