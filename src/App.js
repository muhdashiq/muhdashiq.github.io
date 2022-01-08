import styled from "styled-components";

function App() {
  return (
    <div class="container-fluid">
      <Continer>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Muhammed Ashiq</h3>
          </div>
          <div class="panel-body">
            <address>
              <strong>Software engineer</strong><br/>
              <i class="fa fa-map-marker" aria-hidden="true"/> Chennai, IN 600100<br></br>
              <i class="fa fa-envelope" aria-hidden="true"/> <a href="mailto:#">mail@muhdashiq.com</a>
            </address>
          </div>
          <div class="panel-footer">
            <ul class="list-inline">
                {/* <li><a href="#" class="icoRss" title="Rss"><i class="fa fa-rss"></i></a></li>
                <li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a></li> */}
                <li><a href="https://in.linkedin.com/in/muhdashiq" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>  
      </Continer>
      
    </div>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

const Continer = styled.div`
  display: flex;
  padding: 10px;
  align-item: center;
  justify-content: center;
`;

export default App;
