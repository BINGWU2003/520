document.addEventListener('DOMContentLoaded', function() {
  // 全局变量
  let loveCount = 0;
  let isMusicPlaying = false;
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const loveButton = document.getElementById('loveButton');
  const countElement = document.getElementById('count');
  const sendWishBtn = document.getElementById('sendWish');
  const wishText = document.getElementById('wishText');
  const wishesDisplay = document.getElementById('wishesDisplay');
  const countdownTimer = document.getElementById('countdownTimer');
  
  // 设置面试日期（这里假设面试是在未来某一天）
  const interviewDate = new Date();
  interviewDate.setDate(interviewDate.getDate() + 3); // 假设面试在3天后
  interviewDate.setHours(9, 0, 0); // 设置面试时间为上午9点
  
  // 更新倒计时
  updateCountdown();
  
  // 每秒更新一次倒计时
  setInterval(updateCountdown, 1000);
  
  // 初始化页面
  initPage();
  
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
        confirmButtonColor: '#e91e63'
      });
    }
  });
  
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
        confirmButtonColor: '#e91e63'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '要不要先来点音乐?',
            text: '来点音乐放松一下心情怎么样?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '好啊!',
            cancelButtonText: '稍后再说',
            confirmButtonColor: '#9c27b0'
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
    
    // 初始化一些随机的祝福展示
    const sampleWishes = [
      '相信自己，你一定能成功！',
      '你是最棒的，面试官一定会被你的才华折服',
      '深呼吸，放松，展现最好的自己',
      '无论结果如何，你永远是我心中的第一名'
    ];
    
    sampleWishes.forEach(wish => {
      const wishCard = document.createElement('div');
      wishCard.className = 'wish-card';
      wishCard.textContent = wish;
      wishCard.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
      wishesDisplay.appendChild(wishCard);
    });
  }
  
  // 倒计时函数
  function updateCountdown() {
    const now = new Date();
    const diff = interviewDate - now;
    
    if (diff <= 0) {
      countdownTimer.textContent = "面试时间已到！祝你好运！";
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdownTimer.textContent = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
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
      confirmButtonColor: '#e91e63'
    });
  }
  
  // 发送祝福
  function sendWish(wishContent) {
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
      timer: 1500
    });
  }
}); 