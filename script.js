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
  // 记录总共抽奖次数
  let totalDraws = parseInt(localStorage.getItem('totalDraws') || '0')

  // 礼物列表
  const gifts = [
    { emoji: '🌹', name: '一朵玫瑰花', desc: '象征我对你的爱' },
    { emoji: '🧸', name: '温暖抱抱熊', desc: '送你一个温暖的抱抱' },
    { emoji: '🍫', name: '甜蜜巧克力', desc: '愿甜蜜每一天' },
    { emoji: '🎀', name: '幸运丝带', desc: '愿好运常伴你左右' },
    { emoji: '☕', name: '提神咖啡', desc: '备课辛苦了，来杯咖啡提提神' },
    { emoji: '🍵', name: '养生茶', desc: '别太辛苦，喝杯茶放松一下' },
    { emoji: '🎵', name: '治愈歌曲', desc: '愿美妙的音乐伴你左右' },
    { emoji: '💌', name: '爱的信件', desc: '里面装满了我对你的思念' },
    { emoji: '🔮', name: '水晶球', desc: '预测你课讲得超级棒' },
    { emoji: '💐', name: '祝福花束', desc: '愿你的努力得到回报' },
    { emoji: '🍎', name: '红苹果', desc: '每天一苹果，健康跟着走' },
    { emoji: '🍦', name: '甜筒冰淇淋', desc: '生活要像冰淇淋一样甜蜜' },
    { emoji: '🥤', name: '奶茶', desc: '甜甜的奶茶，甜甜的你' },
    { emoji: '🧁', name: '纸杯蛋糕', desc: '希望你的生活像蛋糕一样甜美' },
    { emoji: '🍰', name: '生日蛋糕', desc: '提前祝你生日快乐' },
    { emoji: '🍩', name: '甜甜圈', desc: '生活需要一点甜' },
    { emoji: '🍭', name: '棒棒糖', desc: '愿你永远像棒棒糖一样甜美' },
    { emoji: '🍬', name: '糖果', desc: '用糖果驱走生活的苦涩' },
    { emoji: '🥂', name: '干杯', desc: '为你的努力干杯' },
    { emoji: '🛌', name: '舒适的床', desc: '别熬夜啦，早点休息' },
    { emoji: '🧠', name: '超级大脑', desc: '你有着聪明的头脑，什么难题都难不倒你' },
    { emoji: '💰', name: '财富袋', desc: '祝你财源广进' },
    { emoji: '💎', name: '钻石', desc: '你是我最珍贵的宝石' },
    { emoji: '👑', name: '皇冠', desc: '你是最棒的，当之无愧的冠军' },
    { emoji: '🏆', name: '奖杯', desc: '最佳讲师奖非你莫属' },
    { emoji: '🎖️', name: '奖牌', desc: '授予你"最佳备课"奖章' },
    { emoji: '🧚', name: '小仙女', desc: '愿仙女棒带来好运和魔法' },
    { emoji: '🧚‍♂️', name: '小精灵', desc: '为你的生活带来一点魔法色彩' },
    { emoji: '🧞‍♀️', name: '女神灯', desc: '可以实现你一个愿望' },
    { emoji: '🧞', name: '神灯精灵', desc: '为你实现三个愿望' },
    { emoji: '🌈', name: '彩虹', desc: '风雨过后总有彩虹' },
    { emoji: '🌞', name: '太阳公公', desc: '愿阳光照进你的心房' },
    { emoji: '⭐', name: '幸运星', desc: '为你点亮一颗星星' },
    { emoji: '🌙', name: '月亮', desc: '愿月光照亮你的梦境' },
    { emoji: '☁️', name: '云朵', desc: '让烦恼都飘散在云端' },
    { emoji: '🌧️', name: '雨滴', desc: '雨滴是大自然的眼泪，别担心，雨后总会有彩虹' },
    { emoji: '❄️', name: '雪花', desc: '你如雪花般独特美丽' },
    { emoji: '🔥', name: '小火苗', desc: '愿你保持内心的热情' },
    { emoji: '🌊', name: '海浪', desc: '愿你如海浪般坚韧不息' },
    { emoji: '🌷', name: '郁金香', desc: '愿你芬芳美丽' },
    { emoji: '🌻', name: '向日葵', desc: '愿你像向日葵一样，永远朝着阳光生长' },
    { emoji: '🌸', name: '樱花', desc: '如樱花般绽放你的美丽' },
    { emoji: '🌺', name: '扶桑花', desc: '希望你的生活如花般绚烂' },
    { emoji: '🪷', name: '荷花', desc: '愿你如出淤泥而不染的荷花' },
    { emoji: '🌼', name: '小雏菊', desc: '生活需要小确幸' },
    { emoji: '🌿', name: '常青藤', desc: '愿你如常青藤般生机勃勃' },
    { emoji: '🍀', name: '四叶草', desc: '带来幸运与祝福' },
    { emoji: '🦋', name: '蝴蝶', desc: '如蝴蝶般翩翩起舞' },
    { emoji: '🐞', name: '瓢虫', desc: '小瓢虫会带来好运哦' },
    { emoji: '🐇', name: '小兔子', desc: '愿你像兔子一样活泼可爱' },
    { emoji: '🦢', name: '天鹅', desc: '愿你如天鹅般优雅' },
    { emoji: '🦉', name: '猫头鹰', desc: '祝你拥有智慧的头脑' },
    { emoji: '🐳', name: '鲸鱼', desc: '像鲸鱼一样自由遨游在知识的海洋' },
    { emoji: '🦄', name: '独角兽', desc: '你是我独一无二的宝贝' },
    { emoji: '🐬', name: '海豚', desc: '愿你如海豚般聪明快乐' },
    { emoji: '🐙', name: '章鱼', desc: '愿你像章鱼一样能干多才' },
    { emoji: '🦋', name: '彩蝶', desc: '愿你的生活如彩蝶般多姿多彩' },
    { emoji: '🌟', name: '闪闪星', desc: '愿你的未来闪闪发光' },
    { emoji: '💫', name: '星星', desc: '你是我心中最亮的星' },
    { emoji: '✨', name: '魔法闪光', desc: '为你的生活增添一点魔法' },
    { emoji: '💕', name: '爱心', desc: '满满的爱意送给你' },
    { emoji: '💓', name: '心跳', desc: '每一次心跳都为你律动' },
    { emoji: '💞', name: '旋转爱心', desc: '爱你的心永不停歇' },
    { emoji: '💝', name: '爱心礼物', desc: '把我的心送给你' },
    { emoji: '💖', name: '闪耀爱心', desc: '愿我们的爱情闪耀永恒' },
    { emoji: '💗', name: '成长的爱', desc: '愿我们的爱情与日俱增' },
    { emoji: '💘', name: '箭射爱心', desc: '你是丘比特之箭射中的目标' },
    { emoji: '💟', name: '爱心装饰', desc: '用爱装饰我们的生活' },
    { emoji: '❣️', name: '爱心感叹', desc: '对你的爱无法用言语表达' },
    { emoji: '💯', name: '满分', desc: '你的课堂表现满分！' },
    { emoji: '🎵', name: '音符', desc: '愿美妙的音乐净化你的心灵' },
    { emoji: '🎼', name: '乐谱', desc: '愿你的生活如音乐般美妙' },
    { emoji: '🎧', name: '耳机', desc: '愿音乐缓解你的压力' },
    { emoji: '📚', name: '知识宝典', desc: '知识就是力量' },
    { emoji: '🔍', name: '放大镜', desc: '帮你找到问题的关键' },
    { emoji: '🧠', name: '聪明脑袋', desc: '你有超级聪明的头脑' },
    { emoji: '📝', name: '备课笔记', desc: '你的备课笔记一定很棒' },
    { emoji: '🖋️', name: '钢笔', desc: '愿你的课程设计如行云流水' },
    { emoji: '📖', name: '知识之书', desc: '知识的大门永远为你敞开' },
    { emoji: '🍹', name: '果汁', desc: '来杯果汁，补充维生素' },
    { emoji: '🍓', name: '草莓', desc: '甜蜜如初恋的味道' },
    { emoji: '🥝', name: '猕猴桃', desc: '酸酸甜甜，生活百味' },
    { emoji: '🥭', name: '芒果', desc: '热带水果带来夏日清凉' },
    { emoji: '🍑', name: '蜜桃', desc: '甜甜的桃子，甜甜的爱情' },
    { emoji: '🍒', name: '樱桃', desc: '小小的樱桃，大大的喜悦' },
    { emoji: '🥥', name: '椰子', desc: '椰风海韵，带你escape一下' },
    { emoji: '🍋', name: '柠檬', desc: '酸酸的柠檬，是生活调味剂' },
    { emoji: '🌮', name: '墨西哥卷', desc: '尝尝异国风味' },
    { emoji: '🍜', name: '拉面', desc: '一碗热腾腾的面，温暖你的胃' },
    { emoji: '🍨', name: '冰淇淋', desc: '冰淇淋的甜蜜，融化你的心' },
    { emoji: '🧇', name: '华夫饼', desc: '香甜可口的早餐，给你满满能量' },
    { emoji: '🥞', name: '松饼', desc: '蓬松香甜，美好的一天从早餐开始' },
    { emoji: '🥨', name: '椒盐脆饼', desc: '生活需要一点咸味' },
    { emoji: '🧣', name: '温暖围巾', desc: '愿你温暖整个冬天' },
    { emoji: '👒', name: '遮阳帽', desc: '保护你的美丽肌肤' },
    { emoji: '🧦', name: '袜子', desc: '温暖从脚开始' },
    { emoji: '👟', name: '运动鞋', desc: '健康生活从运动开始' },
    { emoji: '🧸', name: '泰迪熊', desc: '送你一个抱抱' },
    { emoji: '🎁', name: '神秘礼盒', desc: '惊喜总在意料之外' },
    { emoji: '📮', name: '信箱', desc: '装满了我对你的思念' },
    { emoji: '🎪', name: '马戏团', desc: '生活需要一点乐趣' },
    { emoji: '🎡', name: '摩天轮', desc: '带你看不一样的风景' },
    { emoji: '💤', name: '好梦', desc: '愿你今晚做个好梦' }
  ]

  // 心愿池
  const wishPools = {
    // 加油打气类型的心愿
    encouragement: [
      '加油加油，你是最棒的！',
      '相信自己，必胜！',
      '你可以的，别放弃！',
      '努力终将获得回报！',
      '坚持就是胜利！',
      '今天也要加油哦！',
      '你的潜力无限！',
      '一切困难都会过去！',
      '每天进步一点点！',
      '加把劲，冲冲冲！',
      '你的实力超乎想象！',
      '我永远为你打气！',
      '不管多难都能行！',
      '你能做到的！',
      '拼搏出精彩人生！',
      '勇往直前，无所畏惧！',
      '超常发挥，就在今天！',
      '乘风破浪，势不可挡！',
      '全力以赴，无怨无悔！',
      '迎难而上，越战越勇！',
      '永不言弃，永不服输！',
      '今天也要元气满满！',
      '干劲十足，前程似锦！',
      '斗志昂扬，所向披靡！',
      '自信满满，笑对挑战！',
      '前进的道路有我陪伴！',
      '踏实备课，展翅高飞！',
      '备课小能手就是你！',
      '进步的每一步都是胜利！',
      '争取最好，接受最差！',
      '千里之行，始于足下！',
      '山再高，顶过就是平路！',
      '跌倒了，爬起来再战！',
      '回头望，一路都是成长！',
      '志在千里，壮心不已！',
      '尽力就好，不要太累！',
      '这次的课一定最精彩！',
      '向前冲，不回头！',
      '所有努力都值得！',
      '为自己的付出喝彩！',
      '没有做不到，只有想不到！',
      '星光不问赶路人！',
      '奋斗是青春最美的底色！',
      '今日花开，明日蝶变！',
      '笑对困难，迎风飞扬！',
      '不为失败找理由！',
      '越努力，越幸运！',
      '见证你的每步成长！',
      '敢拼敢做，未来可期！',
      '所有努力皆有回响！'
    ],
    // 关心问候类型的心愿
    caring: [
      '今晚早点休息哦！',
      '记得按时吃饭！',
      '多喝水，保持水分！',
      '别太劳累，注意休息！',
      '要好好照顾自己！',
      '天冷了，多穿点！',
      '雨天记得带伞哦！',
      '注意保暖，别感冒！',
      '下班早点回家！',
      '熬夜对身体不好哦！',
      '累了就休息一会儿！',
      '别忘了吃早餐！',
      '心情不好就告诉我！',
      '有困难随时找我！',
      '你的笑容最治愈！',
      '今天天气真不错！',
      '备课辛苦啦！',
      '饿了记得吃点心！',
      '亲爱的，放松一下！',
      '累了就站起来走走！',
      '眼睛酸了就远眺！',
      '不开心就听首歌！',
      '别对自己太苛刻！',
      '你的健康最重要！',
      '出门戴好口罩！',
      '别忘了运动哦！',
      '周末好好放松！',
      '保护嗓子，少熬夜！',
      '我想你啦！',
      '今天过得好吗？',
      '明天会更好！',
      '天热多补充水分！',
      '晚安，好梦！',
      '早安，元气满满！',
      '中午记得午休哦！',
      '备课辛苦了！',
      '要保持好心情哦！',
      '工作别太拼命！',
      '生病了要及时就医！',
      '抬头挺胸，别驼背！',
      '记得眨眼睛，护眼！',
      '适当放松，别紧张！',
      '别忘了家人朋友！',
      '抽空回家看看！',
      '想你的笑脸！',
      '开心最重要！',
      '别把工作带回家！',
      '劳逸结合最健康！',
      '吃饭细嚼慢咽！',
      '爱你，照顾好自己！'
    ],
    // 鼓励肯定类型的心愿
    affirmation: [
      '相信自己，你的课最棒！',
      '你讲的内容真精彩！',
      '学生都喜欢你！',
      '你是最优秀的老师！',
      '你的付出都被看见！',
      '你的课堂总是充满活力！',
      '你的讲解最生动！',
      '学生都被你感染！',
      '你有教学的天赋！',
      '你的创意无人能及！',
      '你是备课小能手！',
      '你让知识变有趣！',
      '你的教案独具匠心！',
      '课堂气氛被你点燃！',
      '你是教学领域的明星！',
      '你的课堂深入人心！',
      '每堂课都是精品！',
      '你的专业无可挑剔！',
      '学生的进步是你的功劳！',
      '你传递的不只是知识！',
      '你点亮了学生的未来！',
      '你是知识的引路人！',
      '你的课堂充满智慧！',
      '教学相长，你最懂！',
      '你是学生的榜样！',
      '课件做得太精美了！',
      '你的教学方法很创新！',
      '你把复杂变简单！',
      '这节课讲得真精彩！',
      '你的教学思路很清晰！',
      '你的板书工整美观！',
      '你的课堂节奏感强！',
      '你让枯燥变生动！',
      '你的教学技巧一流！',
      '你对知识把握精准！',
      '你的答疑解惑很到位！',
      '你的讲解深入浅出！',
      '你是教学楷模！',
      '你的课堂互动很精彩！',
      '你让学生爱上学习！',
      '学生眼里有光，因为你！',
      '你的耐心令人感动！',
      '你的教学态度最认真！',
      '你是备课天才！',
      '你值得所有掌声！',
      '你的人格魅力无人能及！',
      '你的口才令人佩服！',
      '你拥有独特教学风格！',
      '你是学生心中的偶像！',
      '你是教育事业的栋梁！'
    ]
  };

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

      // 更新倒计时
      updateCountdown()
      // 开始倒计时定时器
      setInterval(updateCountdown, 1000);
    }
  }

  // 倒计时更新函数
  function updateCountdown() {
    const now = new Date()
    let targetDate

    // 获取今年的5月20日
    const thisYear = now.getFullYear()
    targetDate = new Date(thisYear, 4, 20) // 月份从0开始，5月是4

    // 如果今年的5月20日已经过去，则计算到明年的5月20日
    if (now > targetDate) {
      targetDate = new Date(thisYear + 1, 4, 20)
    }

    // 计算时间差（毫秒）
    const diff = targetDate - now

    // 计算剩余天数、小时、分钟和秒数
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    // 更新显示
    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0')
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0')
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0')
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0')
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
            title: '要听首歌吗?',
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
      '每一次的磨课都是进步，加油！',
      '熬夜备课辛苦了，要多喝水，多休息！',
      '你的努力和准备会有回报，加油！',
      '加油，你是最棒的！',
      '加油，你是最棒的！',
      '加油，你是最棒的！',
      '加油，你是最棒的！',
      '加油，你是最棒的！',
      '加油，你是最棒的！'
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

  // 纸飞机功能相关变量和元素
  const airplaneArea = document.getElementById('airplaneArea')
  const sendWishBtn = document.getElementById('sendWishBtn')
  const wishBtns = document.querySelectorAll('.wish-btn')
  let selectedWish = '加油加油，我永远支持你！' // 默认心愿
  let lastFlyTime = 0 // 上次发送时间

  // 初始化纸飞机功能
  initWishAirplane()

  // 初始化抽奖功能
  initLuckyDraw()

  // 纸飞机功能初始化
  function initWishAirplane() {
    // 心愿池
    const wishPools = {
      // 加油打气类型的心愿
      encouragement: [
        '加油加油，你是最棒的！',
        '相信自己，必胜！',
        '你可以的，别放弃！',
        '努力终将获得回报！',
        '坚持就是胜利！',
        '今天也要加油哦！',
        '你的潜力无限！',
        '一切困难都会过去！',
        '每天进步一点点！',
        '加把劲，冲冲冲！',
        '你的实力超乎想象！',
        '我永远为你打气！',
        '不管多难都能行！',
        '你能做到的！',
        '拼搏出精彩人生！',
        '勇往直前，无所畏惧！',
        '超常发挥，就在今天！',
        '乘风破浪，势不可挡！',
        '全力以赴，无怨无悔！',
        '迎难而上，越战越勇！',
        '永不言弃，永不服输！',
        '今天也要元气满满！',
        '干劲十足，前程似锦！',
        '斗志昂扬，所向披靡！',
        '自信满满，笑对挑战！',
        '前进的道路有我陪伴！',
        '踏实备课，展翅高飞！',
        '备课小能手就是你！',
        '进步的每一步都是胜利！',
        '争取最好，接受最差！',
        '千里之行，始于足下！',
        '山再高，顶过就是平路！',
        '跌倒了，爬起来再战！',
        '回头望，一路都是成长！',
        '志在千里，壮心不已！',
        '尽力就好，不要太累！',
        '这次的课一定最精彩！',
        '向前冲，不回头！',
        '所有努力都值得！',
        '为自己的付出喝彩！',
        '没有做不到，只有想不到！',
        '星光不问赶路人！',
        '奋斗是青春最美的底色！',
        '今日花开，明日蝶变！',
        '笑对困难，迎风飞扬！',
        '不为失败找理由！',
        '越努力，越幸运！',
        '见证你的每步成长！',
        '敢拼敢做，未来可期！',
        '所有努力皆有回响！'
      ],
      // 关心问候类型的心愿
      caring: [
        '今晚早点休息哦！',
        '记得按时吃饭！',
        '多喝水，保持水分！',
        '别太劳累，注意休息！',
        '要好好照顾自己！',
        '天冷了，多穿点！',
        '雨天记得带伞哦！',
        '注意保暖，别感冒！',
        '下班早点回家！',
        '熬夜对身体不好哦！',
        '累了就休息一会儿！',
        '别忘了吃早餐！',
        '心情不好就告诉我！',
        '有困难随时找我！',
        '你的笑容最治愈！',
        '今天天气真不错！',
        '备课辛苦啦！',
        '饿了记得吃点心！',
        '亲爱的，放松一下！',
        '累了就站起来走走！',
        '眼睛酸了就远眺！',
        '不开心就听首歌！',
        '别对自己太苛刻！',
        '你的健康最重要！',
        '出门戴好口罩！',
        '别忘了运动哦！',
        '周末好好放松！',
        '保护嗓子，少熬夜！',
        '我想你啦！',
        '今天过得好吗？',
        '明天会更好！',
        '天热多补充水分！',
        '晚安，好梦！',
        '早安，元气满满！',
        '中午记得午休哦！',
        '备课辛苦了！',
        '要保持好心情哦！',
        '工作别太拼命！',
        '生病了要及时就医！',
        '抬头挺胸，别驼背！',
        '记得眨眼睛，护眼！',
        '适当放松，别紧张！',
        '别忘了家人朋友！',
        '抽空回家看看！',
        '想你的笑脸！',
        '开心最重要！',
        '别把工作带回家！',
        '劳逸结合最健康！',
        '吃饭细嚼慢咽！',
        '爱你，照顾好自己！'
      ],
      // 鼓励肯定类型的心愿
      affirmation: [
        '相信自己，你的课最棒！',
        '你讲的内容真精彩！',
        '学生都喜欢你！',
        '你是最优秀的老师！',
        '你的付出都被看见！',
        '你的课堂总是充满活力！',
        '你的讲解最生动！',
        '学生都被你感染！',
        '你有教学的天赋！',
        '你的创意无人能及！',
        '你是备课小能手！',
        '你让知识变有趣！',
        '你的教案独具匠心！',
        '课堂气氛被你点燃！',
        '你是教学领域的明星！',
        '你的课堂深入人心！',
        '每堂课都是精品！',
        '你的专业无可挑剔！',
        '学生的进步是你的功劳！',
        '你传递的不只是知识！',
        '你点亮了学生的未来！',
        '你是知识的引路人！',
        '你的课堂充满智慧！',
        '教学相长，你最懂！',
        '你是学生的榜样！',
        '课件做得太精美了！',
        '你的教学方法很创新！',
        '你把复杂变简单！',
        '这节课讲得真精彩！',
        '你的教学思路很清晰！',
        '你的板书工整美观！',
        '你的课堂节奏感强！',
        '你让枯燥变生动！',
        '你的教学技巧一流！',
        '你对知识把握精准！',
        '你的答疑解惑很到位！',
        '你的讲解深入浅出！',
        '你是教学楷模！',
        '你的课堂互动很精彩！',
        '你让学生爱上学习！',
        '学生眼里有光，因为你！',
        '你的耐心令人感动！',
        '你的教学态度最认真！',
        '你是备课天才！',
        '你值得所有掌声！',
        '你的人格魅力无人能及！',
        '你的口才令人佩服！',
        '你拥有独特教学风格！',
        '你是学生心中的偶像！',
        '你是教育事业的栋梁！'
      ]
    }

    // 心愿选择按钮点击
    wishBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // 移除所有按钮的活跃状态
        wishBtns.forEach(b => b.classList.remove('active'))
        // 为当前点击按钮添加活跃状态
        this.classList.add('active')

        // 确定心愿类型
        let wishType
        if (this.textContent.includes('加油打气')) {
          wishType = 'encouragement'
        } else if (this.textContent.includes('关心问候')) {
          wishType = 'caring'
        } else {
          wishType = 'affirmation'
        }

        // 从对应类型的心愿池中随机选择一条
        const pool = wishPools[wishType]
        selectedWish = pool[Math.floor(Math.random() * pool.length)]

        // 更新按钮的data-wish属性，以便在悬停时可以看到当前选中的心愿
        this.setAttribute('data-wish', selectedWish)
      })
    })

    // 发送心愿按钮点击
    sendWishBtn.addEventListener('click', function () {
      const now = Date.now()
      // 限制发送频率（2秒内只能发送一次）
      if (now - lastFlyTime < 2000) {
        return
      }
      lastFlyTime = now

      // 发送纸飞机
      sendPaperAirplane(selectedWish)

      // 发送后重新随机一条心愿
      const activeBtn = document.querySelector('.wish-btn.active')
      if (activeBtn) {
        let wishType
        if (activeBtn.textContent.includes('加油打气')) {
          wishType = 'encouragement'
        } else if (activeBtn.textContent.includes('关心问候')) {
          wishType = 'caring'
        } else {
          wishType = 'affirmation'
        }

        const pool = wishPools[wishType]
        selectedWish = pool[Math.floor(Math.random() * pool.length)]
        activeBtn.setAttribute('data-wish', selectedWish)
      }
    })
  }

  // 发送纸飞机动画
  function sendPaperAirplane(wishText) {
    // 创建纸飞机元素
    const airplane = document.createElement('div')
    airplane.className = 'paper-airplane'
    airplane.textContent = '✈️'

    // 创建消息气泡
    const bubble = document.createElement('div')
    bubble.className = 'wish-bubble'
    bubble.textContent = wishText

    // 随机Y位置
    const yPos = 20 + Math.random() * 60 // 在区域20%-80%的高度范围内

    // 设置纸飞机初始位置
    airplane.style.top = `${yPos}%`
    airplane.style.animation = `fly-across 4s ease-in-out forwards`

    // 设置气泡位置
    bubble.style.top = `${yPos - 10}%`
    bubble.style.left = '15%'

    // 添加到动画区域
    airplaneArea.appendChild(airplane)
    airplaneArea.appendChild(bubble)

    // 气泡动画延迟显示
    setTimeout(() => {
      bubble.style.opacity = '1'
      bubble.style.transform = 'translateY(0)'
    }, 500)

    // 气泡消失
    setTimeout(() => {
      bubble.style.opacity = '0'
    }, 3000)

    // 动画结束后移除元素
    setTimeout(() => {
      airplane.remove()
      bubble.remove()
    }, 4000)

    // 随机播放发送成功的音效反馈
    playRandomSound()
  }

  // 随机播放音效
  function playRandomSound() {
    const sounds = [
      { emoji: '🎯', text: '心愿已送达' },
      { emoji: '💝', text: '爱的鼓励已送出' },
      { emoji: '✨', text: '温暖传递成功' },
      { emoji: '🚀', text: '加油信息已发送' }
    ]

    const randomSound = sounds[Math.floor(Math.random() * sounds.length)]

    // 显示一个小提示
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    toast.fire({
      icon: 'success',
      title: `${randomSound.emoji} ${randomSound.text}`
    })
  }

  // 初始化抽奖功能
  function initLuckyDraw() {
    const giftBox = document.getElementById('giftBox')
    const drawRemain = document.getElementById('drawRemain');

    // 从本地存储获取剩余抽奖次数
    let remainDraws = parseInt(localStorage.getItem('remainDraws') || '3');
    // 从本地存储获取上次抽奖日期
    const lastDrawDate = localStorage.getItem('lastDrawDate')
    const today = new Date().toDateString();

    // 调戏用户相关变量
    let emptyClickCount = 0 // 抽奖次数为0时的点击次数
    let hasBeenTeased = localStorage.getItem('hasBeenTeased') === 'true' // 今天是否已经被调戏过

    // 如果是新的一天，重置抽奖次数和调戏状态
    if (lastDrawDate !== today) {
      remainDraws = 3
      hasBeenTeased = false
      localStorage.setItem('lastDrawDate', today)
      localStorage.setItem('remainDraws', remainDraws.toString())
      localStorage.setItem('hasBeenTeased', 'false');
    }

    // 更新显示
    drawRemain.textContent = remainDraws.toString();

    // 礼盒点击事件
    giftBox.addEventListener('click', function () {
      // 如果没有剩余抽奖次数
      if (remainDraws <= 0) {
        emptyClickCount++

        // 如果今天还没被调戏过，且点击了3次
        if (!hasBeenTeased && emptyClickCount >= 3) {
          teaseUser().then(bonus => {
            // 奖励新的抽奖次数
            remainDraws = bonus
            localStorage.setItem('remainDraws', remainDraws.toString())
            drawRemain.textContent = remainDraws.toString()

            // 标记为已被调戏
            hasBeenTeased = true
            localStorage.setItem('hasBeenTeased', 'true')

            // 重置点击计数
            emptyClickCount = 0
          })
          return
        }

        // 普通提示
        Swal.fire({
          title: '今日抽奖次数已用完',
          text: hasBeenTeased ? '明天再来吧～' : '真的没有了哦...',
          icon: 'info',
          confirmButtonColor: '#9c27b0'
        })
        return;
      }

      // 如果礼盒正在动画中，不响应点击
      if (this.classList.contains('open') || this.classList.contains('shaking')) {
        return;
      }

      // 播放礼盒抖动动画
      this.classList.add('shaking');

      setTimeout(() => {
        // 移除抖动类
        this.classList.remove('shaking');
        // 添加打开类
        this.classList.add('open');

        // 抽奖并显示结果
        openGiftBox();

        // 减少抽奖次数
        remainDraws--
        localStorage.setItem('remainDraws', remainDraws.toString())
        drawRemain.textContent = remainDraws.toString();

        // 3秒后关闭礼盒
        setTimeout(() => {
          giftBox.classList.remove('open')
        }, 3000)
      }, 500)
    });

    // 初始化设备摇动检测
    if (window.DeviceMotionEvent) {
      let shakeThreshold = 15 // 摇动阈值
      let lastX = 0, lastY = 0, lastZ = 0
      let lastShakeTime = 0;

      window.addEventListener('devicemotion', function (event) {
        const now = Date.now();
        // 限制摇动响应频率（至少间隔1秒）
        if (now - lastShakeTime < 1000) return;

        const acceleration = event.accelerationIncludingGravity
        if (!acceleration) return;

        const x = acceleration.x
        const y = acceleration.y
        const z = acceleration.z;

        // 计算摇动幅度
        const deltaX = Math.abs(x - lastX)
        const deltaY = Math.abs(y - lastY)
        const deltaZ = Math.abs(z - lastZ)

        if ((deltaX > shakeThreshold && deltaY > shakeThreshold) ||
          (deltaX > shakeThreshold && deltaZ > shakeThreshold) ||
          (deltaY > shakeThreshold && deltaZ > shakeThreshold)) {

          lastShakeTime = now;
          // 模拟点击礼盒
          giftBox.click()
        }

        lastX = x
        lastY = y
        lastZ = z
      })
    }
  }

  // 调戏用户的函数
  async function teaseUser() {
    // 调戏文案集合
    const teaseScripts = [
      // 文案套装1 - 系统故障
      {
        step1: {
          title: '系统检测到异常',
          text: '你的点击行为似乎有些可疑...',
          icon: 'warning'
        },
        step2: {
          title: '警告',
          text: '礼物盒已超负荷，系统将在3秒后自毁',
          icon: 'error'
        },
        step3: {
          title: '正在计算惩罚措施...',
          text: '请不要关闭窗口',
          image: true
        },
        step4: {
          title: '开玩笑的啦',
          text: '检测到你的执着，系统决定特别奖励你',
          subtitle: '这可是专属特权哦！'
        }
      },

      // 文案套装2 - 恶作剧
      {
        step1: {
          title: '咦？你在做什么',
          text: '这个礼盒已经空了...',
          icon: 'question'
        },
        step2: {
          title: '再点也没用啦',
          text: '这样点击会把礼盒弄坏的',
          icon: 'warning'
        },
        step3: {
          title: '礼盒开始生气了',
          text: '它正在酝酿某种报复...',
          image: true
        },
        step4: {
          title: '哎呀，礼盒心软了',
          text: '看在你这么喜欢它的份上，它决定送你一点礼物',
          subtitle: '真是个善良的礼盒呢~'
        }
      },

      // 文案套装3 - 魔法故事
      {
        step1: {
          title: '嘘...',
          text: '你触发了一个神秘的咒语',
          icon: 'info'
        },
        step2: {
          title: '魔法能量正在聚集',
          text: '请保持安静，不要惊扰到魔法精灵',
          icon: 'magic'
        },
        step3: {
          title: '魔法仪式进行中',
          text: '星辰、月光、微风正在回应你的召唤',
          image: true
        },
        step4: {
          title: '祝贺！魔法成功了',
          text: '魔法精灵被你的诚心打动，决定赐予你礼物',
          subtitle: '这是来自魔法世界的馈赠~'
        }
      },

      // 文案套装4 - 考验
      {
        step1: {
          title: '坚持不懈的点击',
          text: '你引起了命运女神的注意',
          icon: 'info'
        },
        step2: {
          title: '命运的考验',
          text: '女神决定给你一个小小的挑战',
          icon: 'question'
        },
        step3: {
          title: '正在评估你的资质',
          text: '请等待最终裁决...',
          image: true
        },
        step4: {
          title: '考验通过！',
          text: '你的执着打动了命运女神，她决定眷顾你',
          subtitle: '享受这份来之不易的奖励吧！'
        }
      },

      // 文案套装5 - 科技故障
      {
        step1: {
          title: '检测到非法操作',
          text: '正在记录IP地址和设备信息...',
          icon: 'error'
        },
        step2: {
          title: '安全警报已触发',
          text: '请在5秒内停止操作，否则将采取措施',
          icon: 'warning'
        },
        step3: {
          title: '系统防御机制启动',
          text: '正在部署反制措施...',
          image: true
        },
        step4: {
          title: '安全协议已重置',
          text: '看来你是真心喜欢这个礼盒，系统决定破例放行',
          subtitle: '不要告诉别人这个秘密哦~'
        }
      }
    ]

    // 根据日期生成一个随机数，但同一天内保持一致
    const today = new Date().toDateString()
    const seed = hashCode(today)
    const randomIndex = Math.abs(seed) % teaseScripts.length

    // 选择今日的调戏文案
    const script = teaseScripts[randomIndex]

    // 调戏步骤1
    await Swal.fire({
      title: script.step1.title,
      text: script.step1.text,
      icon: script.step1.icon,
      confirmButtonColor: '#e91e63',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })

    // 调戏步骤2
    await Swal.fire({
      title: script.step2.title,
      text: script.step2.text,
      icon: script.step2.icon,
      confirmButtonColor: '#e91e63',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    })

    // 调戏步骤3
    await Swal.fire({
      title: script.step3.title,
      text: script.step3.text,
      imageUrl: script.step3.image ? 'https://cloudshoping-1318477772.cos.ap-nanjing.myqcloud.com/Gemini_Generated_Image_se3iavse3iavse3i.jpg' : null,
      imageHeight: 100,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    // 调戏步骤4：反转情绪，奖励用户
    const bonusDraws = Math.floor(Math.random() * 3) + 2 // 随机奖励2-4次抽奖机会

    await Swal.fire({
      title: script.step4.title,
      html: `<p>${script.step4.text}</p>
            <p style="font-size: 1.5rem; color: #e91e63; margin: 15px 0;">
              <strong>${bonusDraws}次</strong> 抽奖机会
            </p>
            <p style="font-size: 0.9rem; color: #666;">${script.step4.subtitle}</p>`,
      icon: 'success',
      confirmButtonText: '太棒了',
      confirmButtonColor: '#e91e63'
    })

    return bonusDraws
  }

  // 根据字符串生成哈希码（用于基于日期生成稳定的随机数）
  function hashCode(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // 转换为32位整数
    }
    return hash
  }

  // 打开礼盒显示礼物
  function openGiftBox() {
    // 随机选择一个礼物
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)]

    // 创建礼物元素
    const giftItem = document.createElement('div')
    giftItem.className = 'gift-item'
    giftItem.textContent = randomGift.emoji

    // 添加到礼盒
    const giftBox = document.getElementById('giftBox')
    giftBox.appendChild(giftItem)

    // 增加总抽奖次数记录
    totalDraws++
    localStorage.setItem('totalDraws', totalDraws.toString())

    // 检查是否达到30次
    if (totalDraws === 30) {
      setTimeout(() => {
        showLoveLetter()
      }, 2000)
    }

    // 显示礼物弹窗
    setTimeout(() => {
      Swal.fire({
        title: `恭喜获得 ${randomGift.name}`,
        text: randomGift.desc,
        html: `
          <div style="font-size: 5rem; margin-bottom: 20px;">${randomGift.emoji}</div>
          <p>${randomGift.desc}</p>
        `,
        confirmButtonText: '谢谢',
        confirmButtonColor: '#e91e63'
      })
    }, 800)

    // 动画结束后移除礼物元素
    setTimeout(() => {
      giftItem.remove()
    }, 1500)
  }

  // 显示一周年情书彩蛋
  function showLoveLetter() {
    Swal.fire({
      title: '❤️ 给最爱的你 ❤️',
      html: `
        <div class="love-letter-egg">
          <div class="corner-decoration"></div>
          <div class="letter-content-egg">
            <p>亲爱的<span class="her-name">周周</span>：</p>
            <p>时光飞逝，转眼间我们已经相处了一年。回首这段时光，每一个瞬间都珍贵无比。</p>
            <p>记得初次见面的紧张，第一次牵手的心跳，以及每一次你笑起来的样子，都让我深深着迷。</p>
            <p>这一年里，我们走过春夏秋冬，分享过喜怒哀乐。你的坚强勇敢，温柔体贴，聪明可爱，每一面都让我更加爱你。</p>
            <p>一年的时光，足够让我确信，你就是我想要共度余生的人。无论未来道路如何，我都愿意陪你一起走过。</p>
            <p>感谢你出现在我的生命中，让平凡的日子变得闪闪发光。愿我们的爱情历久弥新，永远如初见般美好。</p>
            <p>这一天，我想再次告诉你：<strong class="highlight-text">我爱你！</strong></p>
            <p class="signature">爱你的胡胡</p>
            <p class="egg-hint">累计抽奖30次彩蛋已解锁 ❤️</p>
          </div>
        </div>
      `,
      width: 800,
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: `rgba(233, 30, 99, 0.4)`,
      showConfirmButton: true,
      confirmButtonText: '我也爱你',
      confirmButtonColor: '#e91e63',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // 点击确认按钮后触发爱心特效
        createManyHearts(50)
      }
    })
  }

  // 创建多个爱心特效
  function createManyHearts(count) {
    // 减少总数量，避免过多DOM元素导致卡顿
    const safeCount = Math.min(count, 30)

    // 分批次创建心形，每批次的数量更少
    const batchSize = 5
    const batches = Math.ceil(safeCount / batchSize)

    for (let b = 0; b < batches; b++) {
      setTimeout(() => {
        // 每批次创建的心形数量
        const currentBatchSize = (b === batches - 1 && safeCount % batchSize !== 0)
          ? safeCount % batchSize
          : batchSize

        // 创建单次特效，但使用更流畅的参数
        createBatchHearts(currentBatchSize)
      }, b * 300) // 批次间隔时间拉长，减轻瞬时压力
    }
  }

  // 创建一批爱心
  function createBatchHearts(amount) {
    // 创建爱心元素
    const hearts = []
    const container = document.querySelector('.container')

    for (let i = 0; i < amount; i++) {
      const heart = document.createElement('div')
      heart.className = 'floating-heart optimized'

      // 随机位置和动画参数
      const left = 10 + Math.random() * 80
      const animDuration = 3 + Math.random() * 3 // 缩短动画时长
      const size = 10 + Math.random() * 15 // 略微减小尺寸
      const opacity = 0.6 + Math.random() * 0.4
      const delay = Math.random() * 0.5 // 添加随机延迟

      // 随机颜色
      const colors = [
        '#e91e63', '#ff6090', '#b0003a', // 主色系
        '#9c27b0', '#d05ce3', '#6a0080'  // 次级色系
      ]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      // 设置样式
      heart.style.left = `${left}%`
      heart.style.width = `${size}px`
      heart.style.height = `${size}px`
      heart.style.opacity = opacity
      heart.style.backgroundColor = randomColor
      heart.style.boxShadow = `0 0 5px ${randomColor}40`
      heart.style.animationDuration = `${animDuration}s`
      heart.style.animationDelay = `${delay}s`

      // 为伪元素设置样式
      const randomId = 'heart-' + Math.floor(Math.random() * 10000)
      heart.id = randomId

      const style = document.createElement('style')
      style.textContent = `
        #${randomId}:before, #${randomId}:after {
          background-color: ${randomColor};
          width: ${size}px;
          height: ${size}px;
        }
        #${randomId}:before {
          top: -${size / 2}px;
        }
        #${randomId}:after {
          left: -${size / 2}px;
        }
      `

      // 添加到DOM
      document.head.appendChild(style)
      container.appendChild(heart)
      hearts.push({ heart, style })

  // 动画结束后移除元素
      setTimeout(() => {
        heart.remove()
        style.remove()
      }, (animDuration + delay) * 1000);
    }
  }

  // 初始化隐藏彩蛋功能
  function initSecretFeature() {
    const footerText = document.getElementById('footerText')
    const secretContent = document.getElementById('secretContent')
    const closeSecret = document.getElementById('closeSecret')
    const tabBtns = document.querySelectorAll('.tab-btn')
    const tabContents = document.querySelectorAll('.tab-content')
    let clickCount = 0
    let lastClickTime = 0
    let secretInitialized = false

    // 页脚文字点击事件
    footerText.addEventListener('click', function () {
      const now = Date.now()

      // 添加点击波纹效果
      this.classList.add('clicked')
      setTimeout(() => {
        this.classList.remove('clicked')
      }, 500)

      // 如果距离上次点击超过3秒，重置计数
      if (now - lastClickTime > 3000) {
        clickCount = 1
      } else {
        clickCount++
      }

      lastClickTime = now

      // 当点击达到10次时，显示隐藏内容
      if (clickCount >= 10) {
        // 初始化隐藏内容（仅第一次需要）
        if (!secretInitialized) {
          initSecretContent()
          secretInitialized = true
        }

        // 显示隐藏内容
        secretContent.style.display = 'flex'

        // 重置点击计数
        clickCount = 0
      }
    })

    // 关闭按钮事件
    closeSecret.addEventListener('click', function () {
      secretContent.style.display = 'none'
    })

    // 标签切换事件
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // 移除所有标签的活跃状态
        tabBtns.forEach(b => b.classList.remove('active'))
        // 为当前点击标签添加活跃状态
        this.classList.add('active')

        // 获取目标内容ID
        const targetId = this.getAttribute('data-tab') + '-content'

        // 隐藏所有内容
        tabContents.forEach(content => {
          content.classList.remove('active')
        })

        // 显示目标内容
        document.getElementById(targetId).classList.add('active')
      })
    })
  }

  // 初始化隐藏内容
  function initSecretContent() {
    // 填充礼物列表
    fillGiftsList()

    // 填充心愿列表
    fillWishesList()
  }

  // 填充礼物列表
  function fillGiftsList() {
    const giftsGrid = document.querySelector('.gifts-grid')

    // 清空现有内容
    giftsGrid.innerHTML = ''

    // 添加所有礼物
    gifts.forEach(gift => {
      const giftCard = document.createElement('div')
      giftCard.className = 'gift-item-card'
      giftCard.innerHTML = `
        <div class="gift-emoji">${gift.emoji}</div>
        <div class="gift-name">${gift.name}</div>
        <div class="gift-desc">${gift.desc}</div>
      `
      giftsGrid.appendChild(giftCard)
    })
  }

  // 填充心愿列表
  function fillWishesList() {
    const encouragementList = document.querySelector('.encouragement-list')
    const caringList = document.querySelector('.caring-list')
    const affirmationList = document.querySelector('.affirmation-list')

    // 清空现有内容
    encouragementList.innerHTML = ''
    caringList.innerHTML = ''
    affirmationList.innerHTML = ''

    // 添加所有加油打气心愿
    wishPools.encouragement.forEach(wish => {
      const li = document.createElement('li')
      li.textContent = wish
      encouragementList.appendChild(li)
    })

    // 添加所有关心问候心愿
    wishPools.caring.forEach(wish => {
      const li = document.createElement('li')
      li.textContent = wish
      caringList.appendChild(li)
    })

    // 添加所有鼓励肯定心愿
    wishPools.affirmation.forEach(wish => {
      const li = document.createElement('li')
      li.textContent = wish
      affirmationList.appendChild(li)
    })
  }
}); 