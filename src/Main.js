import { Menu } from "./ui/Menu.js";
import { Game } from "./game/Game.js";
import { Sound } from "./util/Audio.js";

const audio = new Sound();
const game = new Game(audio);
Menu.init(game, audio);