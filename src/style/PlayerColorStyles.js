export let colors = ['orange', 'purple', 'yellow', 'blue'];

export function tableStyle(player) {
  return {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderSpacing: '0',
    backgroundColor: colors[player],
    padding: '10px',
  };
}

export function playerCardStyle(player) {
  return {
    backgroundColor: colors[player],
  };
}

export function turnMarkerStyle(player) {
  let bg_color;
  if (player === null) {
    bg_color = 'darkgreen';
  } else {
    bg_color = colors[player]
  }
  return {
    borderRadius: '50%',
    border: 'solid 4px white',
    backgroundColor: bg_color,
    width: '100px',
    height: '100px',
    margin: '20px',
    position: 'absolute',
  };
}
