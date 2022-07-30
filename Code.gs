/**
 * Returns an RSS feed for https://www.notion.so/releases,
 * only parses the contents (h3 sections) of the most recent update.
 * Thumbnail pics do not appear in preview (Feedly) if first
 * media element in post is a video?
 * Requires Cheerio → Lib ID: 1ReeQ6WO8kKNxoaA_O0XEQ589cIrRvEBA9qcWpNqdOP17i47u6N9M5Xh0
 *
 * [Adapted from https://github.com/tanabee/google-apps-script-release-notes-feed]
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
  
  // Same date for last updates
  const date = $('time').first().text();

  // There is usually a "Learn more" link at the bottom of each section
  const linkUrls = $('a:contains("Learn more")');

  const items = [];
  $('div.body-limit h3').each((i, elem) => {
    items.push({
      title: $(elem).text(),
      firstParagraph: $(elem).parent().parent().next().children().first().text(),
      // If no URL available, use the What's New page URL
      url: linkUrls.eq(i).attr('href') ? linkUrls.eq(i).attr('href') : URL,
      // Date needs the 00:00:00 time part for newsreaders to acknowledge it
      date: Utilities.formatDate(new Date(date), 'GMT', 'E, dd MMM YYYY') + ' 00:00:00 GMT'
    });
  });

  const template = HtmlService.createTemplateFromFile('rss');
  template.items = items;
  const feed = template.evaluate().getContent();
  
  console.info(feed);
  
  // Cache lives for 6 hours
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