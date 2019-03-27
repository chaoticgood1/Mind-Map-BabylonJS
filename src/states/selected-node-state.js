


class SelectedNodeState {
  constructor(data) {
    this.data = data;
  }

  init() {
    let sm = this.stateManager;
    let main = sm.main;
    this.data.scene = main.scene;
    main.controls.initSelectedState(this.data, (newState) => {
      sm.setState(newState);
    });
  }

  update(delta) {
    
  }

  exit() {
    
  }
}