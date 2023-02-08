# Obsidian TTT Plugin

TTT, a modeless Japanese input, for [Obsidian](https://obsidian.md/).

## Features

- Provides a modeless Japanese input like [ttt](https://github.com/yoyuse/ttt)
- `Cmd+J` (macOS) or `Ctrl+J` (Windows, Linux) converts the TT-code before the cursor to Japanese
- Code scanning goes from the cursor, backward until non TT-code character (typically a space) or delimiter `:` appears; the delimiter is removed after conversion, so use `:` where spacing is not desired

## Install

- Clone this repo
- Install NodeJS, then run `npm i` in the command line under the repo folder
- Run `npm run dev` to compile the plugin from `main.ts` to `main.js`
- Make `YourVault/.obsidian/plugins/obsidian-ttt` folder and place `main.js` and `manifest.json` into it
- Reload Obsidian to load the plugin
- Enable plugin in settings window

## Plugin Settings

- There is no setting

## Known Issues

- TTT conversion is available only in Markdown editor
- Not available for searching (`Cmd+F`), inputting file name (`Cmd+N`), quick switcher (`Cmd+O`), command palette (`Cmd+P`) and so on

## License

- MIT
