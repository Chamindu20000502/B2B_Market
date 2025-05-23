import './Home.css'

function Footer()
{
  return (
    <div class="container-fluid" style={{backgroundColor:'#2a52be'}}>
  <footer class="py-3">
    <ul class="nav justify-content-center border-bottom border-white pb-3 mb-3">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">About</a></li>
    </ul>
    <p class="text-center text-light">© 2025 Company, Inc</p>
  </footer>
</div>
  );
}

export default Footer;