document.addEventListener('DOMContentLoaded', () => {
  const factContent = document.getElementById('fact-content');
  const newFactButton = document.getElementById('new-fact');

  chrome.storage.sync.get(['lang', 'category', 'textColor', 'textSize'], (result) => {
    const lang = result.lang || 'en';
    const category = result.category || 'random';
    const textColor = result.textColor || '#000000';
    const textSize = result.textSize || '16';

    document.body.style.color = textColor;
    factContent.style.fontSize = `${textSize}px`;

    fetchFact(lang, category);
  });

  newFactButton.addEventListener('click', () => {
    chrome.storage.sync.get(['lang', 'category'], (result) => {
      const lang = result.lang || 'en';
      const category = result.category || 'random';
      fetchFact(lang, category);
    });
  });

  function fetchFact(lang, category) {
    const categoryMap = {
      random: '',
      science: 'Category:Science',
      history: 'Category:History',
      technology: 'Category:Technology',
      art: 'Category:Art',
      geography: 'Category:Geography',
      mathematics: 'Category:Mathematics',
      music: 'Category:Music',
      literature: 'Category:Literature',
      biology: 'Category:Biology',
      chemistry: 'Category:Chemistry',
      physics: 'Category:Physics',
      space: 'Category:Space',
      health: 'Category:Health',
      sports: 'Category:Sports',
      politics: 'Category:Politics',
      economics: 'Category:Economics',
      philosophy: 'Category:Philosophy',
      psychology: 'Category:Psychology',
      education: 'Category:Education',
      food: 'Category:Food',
      architecture: 'Category:Architecture',
      engineering: 'Category:Engineering',
      fashion: 'Category:Fashion',
      nature: 'Category:Nature'
    };

    const categoryParam = categoryMap[category];
    const url = categoryParam ? `https://${lang}.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*&generator=categorymembers&gcmtitle=${categoryParam}` : `https://${lang}.wikipedia.org/api/rest_v1/page/random/summary`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let page;
        if (categoryParam) {
          const pages = data.query.pages;
          page = pages[Object.keys(pages)[0]];
        } else {
          page = data;
        }
        document.getElementById('fact-title').textContent = page.title;
        factContent.textContent = page.extract || page.description;
      })
      .catch(error => {
        factContent.textContent = 'Error fetching fact. Please try again later.';
      });
  }
});
