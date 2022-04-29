// inside background-changer div
const solidColors = `
                <h3>Color palettes: </h3>
                <div class="color-palettes">
                  <div class="colorp" id="color1"></div>
                  <div class="colorp" id="color2"></div>
                  <div class="colorp" id="color3"></div>
                  <div class="colorp" id="color4"></div>
                  <div class="colorp" id="color5"></div>
                  <div class="colorp" id="color6"></div>
                </div>
                <div class="custom">
                  <h3>Custom Color:</h3>
                  <div id="solid-picker"></div>
                </div>
`;

const gardientColors = `
            <div class="gradient-changer">
              <div class="fpc">
                  <p>First Color:</p>
                  <div id="gradientColor1Picker"> </div>
              </div>
              <div class="spc">
                  <p>Second Color:</p>
                  <div id="gradientColor2Picker"> </div>
              </div>
                  <p>Direction:</p>
                  <input
                    type="range"
                    id="direction-range"
                    min="0"
                    minlength="0"
                    max="360"
                    maxlength="360"
                    class="directionRanger"
                  />
                </div>
`;

const urlColors = `
                <form>
                  <p>URL:</p>
                  <input type="url" id="backgroundURL" required/>
                  <input type="submit" value="Load" id="loadUrl"/>
                </form>
                <div class="url-image-settings">
                  <p>Settings:</p>
                  <div class="url-image-options">
                    <div class="">
                      <span>Background size: </span>
                      <select name="" id="backgroundImageSize" data-bg-setting="backgroundSize">
                        <option value="unset">Unset</option>
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <span>Background position: </span>
                      <select name="" id="backgroundImagePosition" data-bg-setting="backgroundPosition">
                        <option value="unset">Unset</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="top">Top</option>
                        <option value="center">Center</option>
                      </select>
                    </div>
                    <div>
                      <span>Background repeat: </span>
                      <input type="checkbox" name="" id="backgroundImageRepeat" />
                    </div>
                  </div>
                </div>
`;
