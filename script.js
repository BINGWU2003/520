document.addEventListener('DOMContentLoaded', function() {
  // 全局变量
  let loveCount = parseInt(localStorage.getItem('loveCount') || '0') // 从本地缓存读取加油次数
  let isMusicPlaying = false;
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const loveButton = document.getElementById('loveButton');
  const countElement = document.getElementById('count');
  const lockScreen = document.getElementById('lockScreen');
  const currentDateElement = document.getElementById('currentDate');
  const container = document.querySelector('.container');
  const pageLoader = document.getElementById('pageLoader')

  // 页面加载完成后隐藏加载指示器
  window.addEventListener('load', function () {
    setTimeout(() => {
      pageLoader.classList.add('hidden')
    }, 800)
  })

  // 添加页面加载动画
  fadeInElements();

  // 防止双击缩放
  preventZoom();

  // 初始化显示计数
  countElement.textContent = loveCount;

  // 检查日期
  checkDate();
  
  // 页面元素淡入动画
  function fadeInElements() {
    const fadeElements = document.querySelectorAll('.card-hover')
    fadeElements.forEach((el, index) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = `opacity 0.8s ease, transform 0.8s ease`
      el.style.transitionDelay = `${0.2 + index * 0.15}s`

      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 100)
    })
  }

  // 音乐播放控制
  musicToggle.addEventListener('click', function() {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicToggle.querySelector('.btn-text').textContent = '播放音乐';
      isMusicPlaying = false;
      // 移除所有浮动音符
      document.querySelectorAll('.floating-note').forEach(note => note.remove());
    } else {
      playMusic();
    }
  });

  // 播放音乐函数
  function playMusic() {
    if (!checkAudioSupport()) {
      Swal.fire({
        title: '播放提示',
        text: '您的浏览器可能会阻止自动播放，请点击页面后再尝试播放音乐',
        icon: 'info',
        confirmButtonColor: '#9c27b0'
      })
      return
    }

    bgMusic.play()
      .then(() => {
        musicToggle.querySelector('.btn-text').textContent = '暂停音乐'
        isMusicPlaying = true;

        // 添加音符动画效果
        animateMusicNotes();
      })
      .catch(error => {
        console.error('音乐播放失败:', error)
        Swal.fire({
          title: '音乐播放失败',
          text: '请点击页面任意位置后再尝试播放音乐',
          icon: 'info',
          confirmButtonColor: '#9c27b0'
        })
      })
  }

  // 检查音频支持
  function checkAudioSupport() {
    // 检查是否支持Web Audio API
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContext()
      return true
    } catch (e) {
      console.warn('当前浏览器不完全支持Web Audio API:', e)
      return false
    }
  }
  
  // 添加音符动画
  function animateMusicNotes() {
    const musicPlayer = document.querySelector('.music-player')
    const noteCount = 3

    for (let i = 0; i < noteCount; i++) {
      setTimeout(() => {
        if (!isMusicPlaying) return

        const note = document.createElement('div')
        note.className = 'floating-note'
        note.textContent = i % 2 === 0 ? '♪' : '♫'

        const left = 40 + Math.random() * 20
        const animDuration = 2 + Math.random() * 2

        note.style.left = `${left}%`
        note.style.animationDuration = `${animDuration}s`

        musicPlayer.appendChild(note)

        setTimeout(() => {
          note.remove()
        }, animDuration * 1000)
      }, i * 700)
    }

    // 如果音乐还在播放，继续添加音符动画
    if (isMusicPlaying) {
      setTimeout(animateMusicNotes, 2000)
    }
  }

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

    // 添加闪光特效
    const sparkles = document.querySelectorAll('.sparkle')
    sparkles.forEach(sparkle => {
      sparkle.style.animation = 'none'
      setTimeout(() => {
        sparkle.style.animation = ''
      }, 10)
    });

    setTimeout(() => {
      mainHeart.classList.remove('love-pulse');
    }, 1000);
  });

  // 防止双击缩放
  function preventZoom() {
    // 禁用双指缩放
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault()
    });

    // 禁用双击缩放
    let lastTouchEnd = 0
    document.addEventListener('touchend', function (e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now
    }, false);

    // 防止iOS double-tap-to-zoom
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });
  }

  // 检查日期函数
  function checkDate() {
    const now = new Date()
    const formattedDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    currentDateElement.textContent = formattedDate;

    // 检查是否是5月20日
    const is520 = (now.getMonth() === 4 && now.getDate() === 20) // 月份从0开始，所以5月是4

    // 添加调试选项 - 在URL中添加?debug=1可以绕过日期检查（方便测试）
    const urlParams = new URLSearchParams(window.location.search);
    const isDebug = urlParams.get('debug') === '1';

    if (is520 || isDebug) {
      // 如果是520或处于调试模式，显示页面内容
      lockScreen.style.display = 'none';
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
          });
        }, 800);
      }

      // 初始化页面
      initPage();
    } else {
      // 如果不是520，隐藏页面内容
      lockScreen.style.display = 'flex';
      container.classList.add('hidden');
    }
  }

  // 初始化页面
  function initPage() {
    // 欢迎弹窗
    setTimeout(() => {
      Swal.fire({
        title: '亲爱的周周!',
        text: '520快乐，备课辛苦了！',
        imageUrl: 'https://cloudshoping-1318477772.cos.ap-nanjing.myqcloud.com/Gemini_Generated_Image_se3iavse3iavse3i.jpg',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: '欢迎图片',
        confirmButtonText: '谢谢你的鼓励',
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
            title: '要来听周杰伦的《晴天》吗?',
            text: '听点音乐放松一下，减轻备课压力',
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
              playMusic();
            }
          });
        }
      });
    }, 1000);
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
      const opacity = 0.5 + Math.random() * 0.5

      // 随机旋转和位置偏移
      const rotation = Math.random() * 30 - 15
      const startX = Math.random() * 40 - 20 // 初始水平位置偏移

      // 随机颜色（在主色和次级色之间随机）
      const colors = [
        '#e91e63', '#ff6090', '#b0003a', // 主色系
        '#9c27b0', '#d05ce3', '#6a0080'  // 次级色系
      ]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      // 设置自定义动画
      const customAnimation = `
        @keyframes float-custom-${i} {
          0% {
            transform: rotate(${rotation}deg) translateY(0) translateX(${startX}px);
            opacity: ${opacity};
          }
          20% {
            opacity: ${opacity};
          }
          100% {
            transform: rotate(${rotation + (Math.random() * 20 - 10)}deg) translateY(-100vh) translateX(${startX + (Math.random() * 100 - 50)}px);
            opacity: 0;
          }
        }
      `

      const styleSheet = document.createElement('style')
      styleSheet.textContent = customAnimation
      document.head.appendChild(styleSheet);
      
      heart.style.left = `${left}%`;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.animation = `float-custom-${i} ${animDuration}s ease-out forwards`
      heart.style.backgroundColor = randomColor
      heart.style.boxShadow = `0 0 10px ${randomColor}40`

      // 为伪元素设置样式
      const style = document.createElement('style')
      const randomId = 'heart-' + Math.random().toString(36).substr(2, 9)
      heart.id = randomId

      style.textContent = `
        #${randomId}:before, #${randomId}:after {
          background-color: ${randomColor};
          box-shadow: 0 0 10px ${randomColor}40;
        }
      `;
      
      document.head.appendChild(style);
      container.appendChild(heart);
      
      // 动画结束后移除元素
      setTimeout(() => {
        heart.remove();
        style.remove()
        styleSheet.remove();
      }, animDuration * 1000);
    }
  }
  
  // 显示鼓励消息
  function showEncourageMessage() {
    const messages = [
      '要有信心，相信自己，你是最棒的！',
      '你课讲的超级好，加油！',
      '备课辛苦的你，别忘了休息哦！',
      '每一次的磨课都是进步',
      '熬夜备课辛苦了，要多喝水',
      '你的课件真的很棒，非常用心',
      '你的努力和准备会有回报，加油！'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    Swal.fire({
      title: '❤️ 备课加油 ❤️',
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
}); 