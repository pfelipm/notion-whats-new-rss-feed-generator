/**
 * Returns an RSS feed for https://www.notion.so/releases
 * Adapted from https://github.com/tanabee/google-apps-script-release-notes-feed
 * Requires Cheerio →  ID: 1ReeQ6WO8kKNxoaA_O0XEQ589cIrRvEBA9qcWpNqdOP17i47u6N9M5Xh0
 * 
 * @pfelipm | 30/06/22
 */

const URL = 'https://www.notion.so/releases';
const CACHE_KEY = 'rss';

const getFeed = () => {

  const cache = CacheService.getScriptCache();
  const cached = cache.get(CACHE_KEY);
  if (cached) {
    return cached;
  }

  const content = UrlFetchApp.fetch(URL).getContentText();
  const $ = Cheerio.load(content);
  const date = $('time').first().text();
  const linkUrls = $('a:contains("Learn more")');

  const items = [];
  $('div.body-limit h3').each((i, elem) => {
    items.push({
      title: $(elem).text(),
      firstParagraph: $(elem).parent().parent().next().children().first().text(),
      url: linkUrls.eq(i).attr('href') ? linkUrls.eq(i).attr('href') : 'https://www.notion.so/releases',
      date: Utilities.formatDate(new Date(date), 'GMT', 'E, dd MMM YYYY') + ' 00:00:00 GMT'
    });
  });

  const template = HtmlService.createTemplateFromFile('rss');
  template.items = items;
  const feed = template.evaluate().getContent();
  
  // console.info(feed);
  
  cache.put(CACHE_KEY, feed, 6 * 60 * 60);
  return feed;

}

const doGet = () => {
  return ContentService.createTextOutput(getFeed()).setMimeType(
    ContentService.MimeType.RSS
  );
}

// Cleanup (for testing)
function deleteCache() {
  CacheService.getScriptCache().remove(CACHE_KEY);
}