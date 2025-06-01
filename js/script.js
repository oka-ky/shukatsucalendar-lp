// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // モバイルメニューの制御
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileMenuToggle.classList.contains('active');
            
            if (isActive) {
                // メニューを閉じる
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            } else {
                // メニューを開く
                mobileMenuToggle.classList.add('active');
                mobileMenu.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
        
        // モバイルメニューのリンクをクリックしたときにメニューを閉じる
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // ウィンドウサイズが変更されたときの処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 機能モックアップのアニメーション
    document.querySelectorAll('.feature-mockup').forEach(el => {
        observer.observe(el);
    });
    
    // シーンカードのアニメーション
    document.querySelectorAll('.scene-card').forEach(el => {
        observer.observe(el);
    });
    
    // ステップアイテムのアニメーション
    document.querySelectorAll('.step-item').forEach(el => {
        observer.observe(el);
    });
    
    // FAQアコーディオン
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // 他のアイテムを閉じる
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // クリックしたアイテムをトグル
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ヘッダーのスクロール効果
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール方向の検出
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール - ヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール - ヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
        
        // スクロール位置に応じてヘッダーの背景を変更
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // パララックス効果（軽量版）
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (scrolled < hero.offsetHeight) {
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }
    });
    
    // タッチデバイス対応
    if ('ontouchstart' in window) {
        // タッチデバイスの場合、ホバー効果をタップで実現
        document.querySelectorAll('.scene-card, .testimonial-card, .btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
    
    // 画像の遅延読み込み（プレースホルダー用）
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const placeholder = entry.target;
                placeholder.style.opacity = '1';
                placeholder.style.transform = 'scale(1)';
            }
        });
    });
    
    document.querySelectorAll('.mockup-placeholder').forEach(placeholder => {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'scale(0.95)';
        placeholder.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(placeholder);
    });
    
    // フォームバリデーション（将来的な拡張用）
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ローカルストレージを使用した設定保存（将来的な拡張用）
    function saveUserPreference(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('ローカルストレージに保存できませんでした:', e);
        }
    }
    
    function getUserPreference(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.warn('ローカルストレージから読み込めませんでした:', e);
            return defaultValue;
        }
    }
    
    // パフォーマンス最適化：デバウンス関数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // リサイズイベントのデバウンス
    const debouncedResize = debounce(() => {
        // リサイズ時の処理
        if (window.innerWidth > 768) {
            // デスクトップサイズの場合の処理
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
    
    // アクセシビリティ対応
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        // Escapeキーでモバイルメニューを閉じる
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
        
        // Enterキーでボタンを押下
        if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
            e.target.click();
        }
    });
    
    // フォーカス管理
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // モバイルメニューが開いているときのフォーカストラップ
    const mobileMenuObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mobileMenu.classList.contains('active')) {
                    trapFocus(mobileMenu);
                }
            }
        });
    });
    
    if (mobileMenu) {
        mobileMenuObserver.observe(mobileMenu, { attributes: true });
    }
    
    // 初期化完了のログ
    console.log('就活カレンダー LP - JavaScript初期化完了');
});

