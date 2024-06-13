document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('lang');
  const categorySelect = document.getElementById('category');
  const textColorInput = document.getElementById('textColor');
  const textSizeInput = document.getElementById('textSize');
  const saveButton = document.getElementById('save');
  const saveMessage = document.getElementById('save-message');

  const categories = {
    en: ['Random', 'Science', 'History', 'Technology', 'Art', 'Geography', 'Mathematics', 'Music', 'Literature', 'Biology', 'Chemistry', 'Physics', 'Space', 'Health', 'Sports', 'Politics', 'Economics', 'Philosophy', 'Psychology', 'Education', 'Food', 'Architecture', 'Engineering', 'Fashion', 'Nature'],
    he: ['אקראי', 'מדע', 'היסטוריה', 'טכנולוגיה', 'אמנות', 'גאוגרפיה', 'מתמטיקה', 'מוזיקה', 'ספרות', 'ביולוגיה', 'כימיה', 'פיזיקה', 'חלל', 'בריאות', 'ספורט', 'פוליטיקה', 'כלכלה', 'פילוסופיה', 'פסיכולוגיה', 'חינוך', 'מזון', 'ארכיטקטורה', 'הנדסה', 'אופנה', 'טבע'],
    ru: ['Случайный', 'Наука', 'История', 'Технология', 'Искусство', 'География', 'Математика', 'Музыка', 'Литература', 'Биология', 'Химия', 'Физика', 'Космос', 'Здоровье', 'Спорт', 'Политика', 'Экономика', 'Философия', 'Психология', 'Образование', 'Еда', 'Архитектура', 'Инженерия', 'Мода', 'Природа'],
    ar: ['عشوائي', 'علوم', 'تاريخ', 'تكنولوجيا', 'فن', 'جغرافيا', 'رياضيات', 'موسيقى', 'أدب', 'بيولوجيا', 'كيمياء', 'فيزياء', 'فضاء', 'صحة', 'رياضة', 'سياسة', 'اقتصاد', 'فلسفة', 'علم النفس', 'تعليم', 'طعام', 'هندسة معمارية', 'هندسة', 'موضة', 'طبيعة'],
    zh: ['随机', '科学', '历史', '技术', '艺术', '地理', '数学', '音乐', '文学', '生物', '化学', '物理', '空间', '健康', '体育', '政治', '经济学', '哲学', '心理学', '教育', '食品', '建筑', '工程', '时尚', '自然']
  };

  // Load saved settings
  chrome.storage.sync.get(['lang', 'category', 'textColor', 'textSize'], (result) => {
    const lang = result.lang || 'en';
    const category = result.category || 'random';
    textColorInput.value = result.textColor || '#000000';
    textSizeInput.value = result.textSize || '16';
    langSelect.value = lang;
    updateLanguage(lang);
    updateCategories(lang, category);
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    const lang = langSelect.value;
    const category = categorySelect.value;
    const textColor = textColorInput.value;
    const textSize = textSizeInput.value;

    chrome.storage.sync.set({ lang, category, textColor, textSize }, () => {
      saveMessage.classList.remove('hidden');
      setTimeout(() => {
        saveMessage.classList.add('hidden');
      }, 3000);
      updateLanguage(lang);
    });
  });

  langSelect.addEventListener('change', () => {
    const selectedLang = langSelect.value;
    updateLanguage(selectedLang);
    updateCategories(selectedLang);
  });

  function updateLanguage(lang) {
    const elements = {
      en: {
        'settings-title': 'Settings',
        'lang-label': 'Language:',
        'category-label': 'Category:',
        'textColor-label': 'Text Color:',
        'textSize-label': 'Text Size:',
        'save': 'Save',
        'save-message': 'Settings saved!'
      },
      he: {
        'settings-title': 'הגדרות',
        'lang-label': 'שפה:',
        'category-label': 'קטגוריה:',
        'textColor-label': 'צבע טקסט:',
        'textSize-label': 'גודל טקסט:',
        'save': 'שמור',
        'save-message': 'ההגדרות נשמרו!'
      },
      ru: {
        'settings-title': 'Настройки',
        'lang-label': 'Язык:',
        'category-label': 'Категория:',
        'textColor-label': 'Цвет текста:',
        'textSize-label': 'Размер текста:',
        'save': 'Сохранить',
        'save-message': 'Настройки сохранены!'
      },
      ar: {
        'settings-title': 'الإعدادات',
        'lang-label': 'اللغة:',
        'category-label': 'الفئة:',
        'textColor-label': 'لون النص:',
        'textSize-label': 'حجم النص:',
        'save': 'حفظ',
        'save-message': 'تم حفظ الإعدادات!'
      },
      zh: {
        'settings-title': '设置',
        'lang-label': '语言:',
        'category-label': '类别:',
        'textColor-label': '文字颜色:',
        'textSize-label': '文字大小:',
        'save': '保存',
        'save-message': '设置已保存!'
      }
    };

    const langElements = elements[lang];
    for (const [id, text] of Object.entries(langElements)) {
      document.getElementById(id).textContent = text;
    }
  }

  function updateCategories(lang, selectedCategory = 'random') {
    categorySelect.innerHTML = '';
    categories[lang].forEach(category => {
      const option = document.createElement('option');
      option.value = category.toLowerCase();
      option.textContent = category;
      if (category.toLowerCase() === selectedCategory) {
        option.selected = true;
      }
      categorySelect.appendChild(option);
    });
  }
});
