document.addEventListener('DOMContentLoaded', function() {
  // 全局变量
  let loveCount = parseInt(localStorage.getItem('loveCount') || '0') // 从本地缓存读取加油次数
  let isMusicPlaying = false;
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const loveButton = document.getElementById('loveButton');
  const countElement = document.getElementById('count');
  const sendWishBtn = document.getElementById('sendWish');
  const wishText = document.getElementById('wishText');
  const wishesDisplay = document.getElementById('wishesDisplay');
  const lockScreen = document.getElementById('lockScreen')
  const currentDateElement = document.getElementById('currentDate');
  const container = document.querySelector('.container');
  
  // 防止双击缩放
  preventZoom()

  // 初始化显示计数
  countElement.textContent = loveCount;

  // 检查日期
  checkDate();
  
  // 音乐播放控制
  musicToggle.addEventListener('click', function() {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicToggle.textContent = '播放音乐';
      isMusicPlaying = false;
    } else {
      bgMusic.play();
      musicToggle.textContent = '暂停音乐';
      isMusicPlaying = true;
    }
  });
  
  // 爱心点击事件
  loveButton.addEventListener('click', function() {
    loveCount++;
    countElement.textContent = loveCount;
    // 保存到本地缓存
    localStorage.setItem('loveCount', loveCount.toString());
    createHearts();
    
    if (loveCount % 5 === 0) {
      showEncourageMessage();
    }
    
    // 让主爱心跳动更明显
    const mainHeart = document.getElementById('main-heart');
    mainHeart.classList.add('love-pulse');
    setTimeout(() => {
      mainHeart.classList.remove('love-pulse');
    }, 1000);
  });
  
  // 发送祝福
  sendWishBtn.addEventListener('click', function() {
    if (wishText.value.trim() !== '') {
      sendWish(wishText.value);
      wishText.value = '';
    } else {
      Swal.fire({
        title: '祝福不能为空',
        text: '请写下你对她的鼓励',
        icon: 'warning',
        confirmButtonText: '好的',
        confirmButtonColor: '#e91e63',
        showClass: {
          popup: 'swal2-noanimation',
          backdrop: 'swal2-noanimation'
        },
        hideClass: {
          popup: '',
          backdrop: ''
        }
      });
    }
  });
  
  // 防止双击缩放
  function preventZoom() {
    // 禁用双指缩放
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault()
    })

    // 禁用双击缩放
    let lastTouchEnd = 0
    document.addEventListener('touchend', function (e) {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }, false)

    // 防止iOS double-tap-to-zoom
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    }, { passive: false })
  }

  // 检查日期函数
  function checkDate() {
    const now = new Date()
    const formattedDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
    currentDateElement.textContent = formattedDate;

    // 检查是否是5月20日
    const is520 = (now.getMonth() === 4 && now.getDate() === 20) // 月份从0开始，所以5月是4

    // 添加调试选项 - 在URL中添加?debug=1可以绕过日期检查（方便测试）
    const urlParams = new URLSearchParams(window.location.search)
    const isDebug = urlParams.get('debug') === '1';

    if (is520 || isDebug) {
      // 如果是520或处于调试模式，显示页面内容
      lockScreen.style.display = 'none'
      container.classList.remove('hidden');

      // 如果是真正的520（非调试模式），展示特殊的欢迎信息
      if (is520) {
        setTimeout(() => {
          Swal.fire({
            title: '520快乐！',
            html: '今天是特别的日子，<br>我想对你说：我爱你！',
            icon: 'heart',
            iconHtml: '❤️',
            confirmButtonText: '我也爱你',
            confirmButtonColor: '#e91e63',
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: `rgba(233, 30, 99, 0.4)`,
            showClass: {
              popup: 'swal2-noanimation',
              backdrop: 'swal2-noanimation'
            },
            hideClass: {
              popup: '',
              backdrop: ''
            }
          })
        }, 800);
      }

      // 初始化页面
      initPage();
    } else {
      // 如果不是520，隐藏页面内容
      lockScreen.style.display = 'flex'
      container.classList.add('hidden');
    }
  }

  // 初始化页面
  function initPage() {
    // 欢迎弹窗
    setTimeout(() => {
      Swal.fire({
        title: '亲爱的宝贝!',
        text: '520快乐，祝你面试顺利！',
        imageUrl: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: '欢迎图片',
        confirmButtonText: '谢谢你的祝福',
        confirmButtonColor: '#e91e63',
        showClass: {
          popup: 'swal2-noanimation',
          backdrop: 'swal2-noanimation'
        },
        hideClass: {
          popup: '',
          backdrop: ''
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '要不要先来点音乐?',
            text: '来点音乐放松一下心情怎么样?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '好啊!',
            cancelButtonText: '稍后再说',
            confirmButtonColor: '#9c27b0',
            showClass: {
              popup: 'swal2-noanimation',
              backdrop: 'swal2-noanimation'
            },
            hideClass: {
              popup: '',
              backdrop: ''
            }
          }).then((result) => {
            if (result.isConfirmed) {
              bgMusic.play();
              musicToggle.textContent = '暂停音乐';
              isMusicPlaying = true;
            }
          });
        }
      });
    }, 1000);
    
    // 从本地缓存加载祝福
    loadWishesFromStorage()

    // 初始化一些随机的祝福展示（只有在没有缓存的祝福时才显示）
    if (!localStorage.getItem('wishes') || JSON.parse(localStorage.getItem('wishes')).length === 0) {
      const sampleWishes = [
        '相信自己，你一定能成功！',
        '你是最棒的，面试官一定会被你的才华折服',
        '深呼吸，放松，展现最好的自己',
        '无论结果如何，你永远是我心中的第一名'
      ]

      sampleWishes.forEach(wish => {
        const wishCard = document.createElement('div')
        wishCard.className = 'wish-card'
        wishCard.textContent = wish
        wishCard.style.transform = `rotate(${Math.random() * 10 - 5}deg)`
        wishesDisplay.appendChild(wishCard)
      });
    }
  }

  // 从本地缓存加载祝福
  function loadWishesFromStorage() {
    const savedWishes = localStorage.getItem('wishes')
    if (savedWishes) {
      const wishes = JSON.parse(savedWishes)
      wishes.forEach(wish => {
        const wishCard = document.createElement('div')
        wishCard.className = 'wish-card'
        wishCard.textContent = wish
        wishCard.style.transform = `rotate(${Math.random() * 10 - 5}deg)`
        wishesDisplay.appendChild(wishCard)
      })
    }
  }

  // 创建爱心动画
  function createHearts() {
    const container = document.querySelector('.container');
    const heartCount = 5 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      
      // 随机位置和动画延迟
      const left = 10 + Math.random() * 80; // 百分比位置
      const animDuration = 3 + Math.random() * 4; // 动画时长
      const size = 10 + Math.random() * 20; // 爱心大小
      
      heart.style.left = `${left}%`;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.animationDuration = `${animDuration}s`;
      heart.style.opacity = 0.5 + Math.random() * 0.5;
      
      container.appendChild(heart);
      
      // 动画结束后移除元素
      setTimeout(() => {
        heart.remove();
      }, animDuration * 1000);
    }
  }
  
  // 显示鼓励消息
  function showEncourageMessage() {
    const messages = [
      '你的能力和才华会让面试官眼前一亮',
      '相信自己，面试只是展示你能力的舞台',
      '深呼吸，放松，你能行的！',
      '面试官会被你的魅力所折服',
      '展现最真实的自己，成功就在前方',
      '你的努力和准备不会白费，加油！'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    Swal.fire({
      title: '❤️ 面试加油 ❤️',
      text: randomMessage,
      icon: 'success',
      confirmButtonText: '谢谢你',
      confirmButtonColor: '#e91e63',
      showClass: {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation'
      },
      hideClass: {
        popup: '',
        backdrop: ''
      }
    });
  }
  
  // 发送祝福
  function sendWish(wishContent) {
    // 保存祝福到本地存储
    saveWishToStorage(wishContent);

    // 创建祝福卡片
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    wishCard.textContent = wishContent;
    wishCard.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
    wishCard.style.opacity = '0';
    
    wishesDisplay.prepend(wishCard);
    
    // 添加飘上来的动画效果
    setTimeout(() => {
      wishCard.style.transition = 'opacity 1s ease, transform 1s ease';
      wishCard.style.opacity = '1';
    }, 10);
    
    // 成功提示
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '祝福已送出',
      text: '你的鼓励会给她力量',
      showConfirmButton: false,
      timer: 1500,
      showClass: {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation'
      },
      hideClass: {
        popup: '',
        backdrop: ''
      }
    });
  }

  // 保存祝福到本地存储
  function saveWishToStorage(wishContent) {
    let wishes = []
    const savedWishes = localStorage.getItem('wishes')

    if (savedWishes) {
      wishes = JSON.parse(savedWishes)
    }

    // 将新的祝福添加到数组开头（与界面显示顺序一致）
    wishes.unshift(wishContent)

    // 保存到本地存储
    localStorage.setItem('wishes', JSON.stringify(wishes))
  }
}); 