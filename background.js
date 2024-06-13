chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ lang: 'en' }, () => {
    console.log('Default language set to English.');
  });
});
