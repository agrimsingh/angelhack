import { PointCloud, Recognizer, Point } from 'outlines';

const recognizer = new Recognizer();

// Triangle
recognizer.PointClouds.push(new PointCloud('Triangle', [
  new Point(0, 7, 1), new Point(5, 0, 1),
  new Point(5, 0, 1), new Point(10, 7, 1),
  new Point(10, 5, 1), new Point(0, 5, 1),
]));

// T shape
recognizer.PointClouds.push(new PointCloud('T', [
  new Point(30, 7, 1), new Point(103, 7, 1),
  new Point(66, 7, 2), new Point(66, 87, 2),
]));

// N shape
recognizer.PointClouds.push(new PointCloud('N', [
  new Point(5, 5, 1), new Point(5, 0, 1),
  new Point(5, 0, 2), new Point(10, 5, 2),
  new Point(10, 5, 3), new Point(10, 0, 3),
]));

// W shape
recognizer.PointClouds.push(new PointCloud('W', [
  new Point(5, 0, 1), new Point(10, 5, 1),
  new Point(10, 5, 2), new Point(10, 0, 2),
  new Point(10, 0, 3), new Point(15, 5, 3),
  new Point(15, 5, 4), new Point(15, 0, 4),
]));

// 2 shape
recognizer.PointClouds.push(new PointCloud('2', [
  new Point(0, 1, 1), new Point(1, 0, 1), new Point(2, 0, 1), new Point(3, 0, 1), new Point(4, 1, 1), new Point(4, 2, 1), new Point(3, 3, 1), new Point(2, 4, 1), new Point(1, 5, 1), new Point(0, 6, 1), new Point(1, 6, 1), new Point(2, 6, 1), new Point(3, 6, 1), new Point(4, 6, 1),
]));

// 3 shape
recognizer.PointClouds.push(new PointCloud('3', [
  new Point(0, 1, 1), new Point(1, 0, 1), new Point(2, 0, 1), new Point(3, 0, 1), new Point(4, 1, 1), new Point(4, 2, 1), new Point(3, 3, 1), new Point(2, 3, 1), new Point (3, 3, 1), new Point(4, 4, 1), new Point(4, 5, 1), new Point(3, 6, 1), new Point(2, 6, 1), new Point(1, 6, 1), new Point(0, 5, 1)
]));

// Oxygen shape
recognizer.PointClouds.push(new PointCloud('Oxygen Molecule', [
  new Point(382, 310, 1), new Point(377, 308, 1), new Point(373, 307, 1), new Point(366, 307, 1), new Point(360, 310, 1), new Point(356, 313, 1), new Point(353, 316, 1), new Point(349, 321, 1), new Point(347, 326, 1), new Point(344, 331, 1), new Point(342, 337, 1), new Point(341, 343, 1), new Point(341, 350, 1), new Point(341, 358, 1), new Point(342, 362, 1), new Point(344, 366, 1), new Point(347, 370, 1), new Point(351, 374, 1), new Point(356, 379, 1), new Point(361, 382, 1), new Point(368, 385, 1), new Point(374, 387, 1), new Point(381, 387, 1), new Point(390, 387, 1), new Point(397, 385, 1), new Point(404, 382, 1), new Point(408, 378, 1), new Point(412, 373, 1), new Point(416, 367, 1), new Point(418, 361, 1), new Point(419, 353, 1), new Point(418, 346, 1), new Point(417, 341, 1), new Point(416, 336, 1), new Point(413, 331, 1), new Point(410, 326, 1), new Point(404, 320, 1), new Point(400, 317, 1), new Point(393, 313, 1), new Point(392, 312, 1),
  new Point(410, 310, 2), new Point(490, 310, 2),
  new Point(410, 360, 3), new Point(490, 360, 3),
  new Point(532, 310, 4), new Point(527, 308, 4), new Point(523, 307, 4), new Point(516, 307, 4), new Point(510, 310, 4), new Point(506, 313, 4), new Point(503, 316, 4), new Point(499, 321, 4), new Point(497, 326, 4), new Point(494, 331, 4), new Point(492, 337, 4), new Point(491, 343, 4), new Point(491, 350, 4), new Point(491, 358, 4), new Point(492, 362, 4), new Point(494, 366, 4), new Point(497, 370, 4), new Point(501, 374, 4), new Point(506, 379, 4), new Point(511, 382, 4), new Point(518, 385, 4), new Point(524, 387, 4), new Point(531, 387, 4), new Point(540, 387, 4), new Point(547, 385, 4), new Point(554, 382, 4), new Point(558, 378, 4), new Point(562, 373, 4), new Point(566, 367, 4), new Point(568, 361, 4), new Point(569, 353, 4), new Point(568, 346, 4), new Point(567, 341, 4), new Point(566, 336, 4), new Point(563, 331, 4), new Point(560, 326, 4), new Point(564, 320, 4), new Point(550, 317, 4), new Point(543, 313, 4), new Point(542, 312, 4),
]));

// Imperfect oxygen
recognizer.PointClouds.push(new PointCloud('Oxygen Molecule (Missing one bond)', [
  new Point(382, 310, 1), new Point(377, 308, 1), new Point(373, 307, 1), new Point(366, 307, 1), new Point(360, 310, 1), new Point(356, 313, 1), new Point(353, 316, 1), new Point(349, 321, 1), new Point(347, 326, 1), new Point(344, 331, 1), new Point(342, 337, 1), new Point(341, 343, 1), new Point(341, 350, 1), new Point(341, 358, 1), new Point(342, 362, 1), new Point(344, 366, 1), new Point(347, 370, 1), new Point(351, 374, 1), new Point(356, 379, 1), new Point(361, 382, 1), new Point(368, 385, 1), new Point(374, 387, 1), new Point(381, 387, 1), new Point(390, 387, 1), new Point(397, 385, 1), new Point(404, 382, 1), new Point(408, 378, 1), new Point(412, 373, 1), new Point(416, 367, 1), new Point(418, 361, 1), new Point(419, 353, 1), new Point(418, 346, 1), new Point(417, 341, 1), new Point(416, 336, 1), new Point(413, 331, 1), new Point(410, 326, 1), new Point(404, 320, 1), new Point(400, 317, 1), new Point(393, 313, 1), new Point(392, 312, 1),
  new Point(410, 310, 2), new Point(490, 310, 2),
  new Point(532, 310, 3), new Point(527, 308, 3), new Point(523, 307, 3), new Point(516, 307, 3), new Point(510, 310, 3), new Point(506, 313, 3), new Point(503, 316, 3), new Point(499, 321, 3), new Point(497, 326, 3), new Point(494, 331, 3), new Point(492, 337, 3), new Point(491, 343, 3), new Point(491, 350, 3), new Point(491, 358, 3), new Point(492, 362, 3), new Point(494, 366, 3), new Point(497, 370, 3), new Point(501, 374, 3), new Point(506, 379, 3), new Point(511, 382, 3), new Point(518, 385, 3), new Point(524, 387, 3), new Point(531, 387, 3), new Point(540, 387, 3), new Point(547, 385, 3), new Point(554, 382, 3), new Point(558, 378, 3), new Point(562, 373, 3), new Point(566, 367, 3), new Point(568, 361, 3), new Point(569, 353, 3), new Point(568, 346, 3), new Point(567, 341, 3), new Point(566, 336, 3), new Point(563, 331, 3), new Point(560, 326, 3), new Point(564, 320, 3), new Point(550, 317, 3), new Point(543, 313, 3), new Point(542, 312, 3),
]));

// Formaldehyde shape
recognizer.PointClouds.push(new PointCloud('Formaldehyde', [
  new Point(382, 310, 1), new Point(377, 308, 1), new Point(373, 307, 1), new Point(366, 307, 1), new Point(360, 310, 1), new Point(356, 313, 1), new Point(353, 316, 1), new Point(349, 321, 1), new Point(347, 326, 1), new Point(344, 331, 1), new Point(342, 337, 1), new Point(341, 343, 1), new Point(341, 350, 1), new Point(341, 358, 1), new Point(342, 362, 1), new Point(344, 366, 1), new Point(347, 370, 1), new Point(351, 374, 1), new Point(356, 379, 1), new Point(361, 382, 1), new Point(368, 385, 1), new Point(374, 387, 1), new Point(381, 387, 1), new Point(390, 387, 1), new Point(397, 385, 1), new Point(404, 382, 1), new Point(408, 378, 1), new Point(412, 373, 1), new Point(416, 367, 1), new Point(418, 361, 1), new Point(419, 353, 1), new Point(418, 346, 1), new Point(417, 341, 1), new Point(416, 336, 1), new Point(413, 331, 1), new Point(410, 326, 1), new Point(404, 320, 1), new Point(400, 317, 1), new Point(393, 313, 1), new Point(392, 312, 1),
  new Point(410, 310, 2), new Point(490, 310, 2),
  new Point(410, 360, 3), new Point(490, 360, 3),
  new Point(532, 310, 4), new Point(527, 308, 4), new Point(523, 307, 4), new Point(516, 307, 4), new Point(510, 310, 4), new Point(506, 313, 4), new Point(503, 316, 4), new Point(499, 321, 4), new Point(497, 326, 4), new Point(494, 331, 4), new Point(492, 337, 4), new Point(491, 343, 4), new Point(491, 350, 4), new Point(491, 358, 4), new Point(492, 362, 4), new Point(494, 366, 4), new Point(497, 370, 4), new Point(540, 387, 4), new Point(547, 385, 4), new Point(550, 317, 4), new Point(543, 313, 4), new Point(542, 312, 4),
  new Point(592, 307, 5), new Point(668, 232, 5),
  new Point(592, 407, 6), new Point(668, 483, 6),
  new Point(688, 137, 7), new Point(688, 225, 7),
  new Point(688, 180, 8), new Point(741, 180, 8),
  new Point(741, 137, 9), new Point(741, 225, 9),
  new Point(688, 497, 10), new Point(688, 565, 10),
  new Point(688, 540, 11), new Point(741, 540, 11),
  new Point(741, 497, 12), new Point(741, 565, 12),
]));

// Star shape
recognizer.PointClouds.push(new PointCloud('Star', [
  new Point(177, 396, 1), new Point(223, 299, 1), new Point(262, 396, 1), new Point(168, 332, 1), new Point(278, 332, 1), new Point(184, 397, 1),
]));

export default recognizer;
