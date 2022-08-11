![Created with - Google Apps Script](https://img.shields.io/static/v1?label=Created+with&message=Google+Apps+Script&color=blue)

# An RSS feed generator for Notion's releases

```
As of 30/07/22, the Notion Release Notes webpage is generated dynamically,
which renders this script useless as Cheerio can't parse dynamic contents.
Some relevant text content can still be extracted using Cheerio, but I guess
that adapting this script or using a more complex solution (Puppeteer, etc.)
probably is not worth the hassle.

End of story.

Working again on 01/08/22! 😧
```

This is a rather crude attempt at an Apps Script webapp that scrapes [Notion's release page](https://www.notion.so/releases) and generates an RSS feed that contains the most recently published updates. It uses the [Cheerio library](1ReeQ6WO8kKNxoaA_O0XEQ589cIrRvEBA9qcWpNqdOP17i47u6N9M5Xh0) for Apps Script. Please, bear in mind that this thing was just a quick hack to play a little bit with Cheerio and can break anytime. You can either make a copy of the provided codebase and deploy your own webapp or simply use the URL of this pre-deployed instance to add the RSS feed to your newsreader:

```
https://script.google.com/macros/s/AKfycbyDWx-2kqgbbubmdqKAu5RLmyl2J_XnDau_j5MY-Gg_gxvYcjOr9Lkoaz9-V9zhsfPQ/exec
```

![](https://user-images.githubusercontent.com/12829262/176777336-656e2566-e18f-4776-a66d-ccaa3a92fb10.gif)

PS: Adapted from this [Apps Script release notes feed generator](https://github.com/tanabee/google-apps-script-release-notes-feed) by Yuki Tanabe.
