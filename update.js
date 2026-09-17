const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf-8');

const headerEnd = indexHtml.indexOf('    <!-- Hero Section -->');
const footerStart = indexHtml.indexOf('    <!-- Footer Divider Graphic -->');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const newBody = `
    <!-- Rotating Hero Banner -->
    <section class="hero-slider-section">
        <div class="swiper hero-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="slide-bg" style="background-image: url('assets/WhatsApp-Image-2025-08-30-at-13-47-35.jpeg');"></div>
                    <div class="hero-overlay-gradient"></div>
                    <div class="container hero-slide-content">
                        <span class="hero-badge">[ Noman Maintenance Services ]</span>
                        <h1>Comprehensive Solutions for Industrial & Infrastructure Success</h1>
                        <a href="#" class="btn btn-primary">Explore More</a>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide-bg" style="background-image: url('assets/WhatsApp-Image-2025-09-04-at-10-30-26.jpeg');"></div>
                    <div class="hero-overlay-gradient"></div>
                    <div class="container hero-slide-content">
                        <span class="hero-badge">[ Noman Maintenance Services ]</span>
                        <h1>Pioneering Excellence in Every Project We Undertake</h1>
                        <a href="#" class="btn btn-primary">Explore More</a>
                    </div>
                </div>
            </div>
            <!-- Navigation -->
            <div class="swiper-button-next hero-next"></div>
            <div class="swiper-button-prev hero-prev"></div>
        </div>
        <!-- 150+ Employees Floating Badge -->
        <div class="floating-badge-employees">
            <span class="emp-number">150+</span>
            <span class="emp-text">EMPLOYEES</span>
        </div>
    </section>

    <!-- Global Clients -->
    <section class="global-clients section-padding" style="padding: 40px 0; background: #fff;">
        <div class="container text-center">
            <h3 class="clients-title" style="font-size: 1.2rem; color: #0b3d91; font-weight: 700; margin-bottom: 30px;">Our Global Clients</h3>
            <div class="clients-logos" style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap;">
                <img src="assets/image (1).svg" alt="Client 1" style="height: 40px; opacity: 0.8; filter: grayscale(100%); transition: 0.3s;">
                <img src="assets/image (2).svg" alt="Client 2" style="height: 40px; opacity: 0.8; filter: grayscale(100%); transition: 0.3s;">
                <img src="assets/image (3).svg" alt="Client 3" style="height: 40px; opacity: 0.8; filter: grayscale(100%); transition: 0.3s;">
                <img src="assets/image (4).svg" alt="Client 4" style="height: 40px; opacity: 0.8; filter: grayscale(100%); transition: 0.3s;">
                <img src="assets/image.svg" alt="Client 5" style="height: 40px; opacity: 0.8; filter: grayscale(100%); transition: 0.3s;">
            </div>
        </div>
    </section>

    <!-- Vision 2030 Banner & About -->
    <section class="vision-about-section section-padding" style="background: #f5f7fa;">
        <div class="container">
            <div class="vision-banner" style="background: #fff; border-radius: 12px; padding: 0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; overflow: hidden; align-items: center; max-width: 900px; margin: 0 auto; margin-bottom: 80px;">
                <div style="flex: 1; padding: 40px; background: #0b3d91; color: white;">
                    <img src="assets/world_map_png_6_1.webp" alt="Vision 2030" style="height: 60px; filter: brightness(0) invert(1); margin-bottom: 15px;">
                    <p style="opacity: 0.9; font-size: 0.95rem; line-height: 1.6;">Aligned with Saudi Vision 2030, we actively contribute to building a thriving economy through infrastructure and industrial excellence.</p>
                </div>
                <div style="flex: 1.5; padding: 40px;">
                    <h4 style="color: #ff7e00; margin-bottom: 10px; font-weight: 700;">VISION 2030</h4>
                    <h3 style="color: #0b3d91; font-size: 1.5rem; font-weight: 800; margin-bottom: 15px;">Commitment to the Kingdom's Future</h3>
                    <p style="color: #666; font-size: 0.95rem; line-height: 1.6;">Our strategic initiatives and projects are designed to empower the local workforce and drive sustainable industrial growth across Saudi Arabia.</p>
                </div>
            </div>
            
            <div class="about-block text-center mt-5">
                <span class="badge" style="color: #ff7e00; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">ABOUT NOMAN MAINTENANCE</span>
                <h2 class="section-title" style="font-size: 2.5rem; font-weight: 800; color: #0b3d91; margin: 15px 0 25px;">A PARTNER YOU CAN TRUST</h2>
                <p class="section-subtitle mx-auto" style="max-width: 800px; color: #666; font-size: 1.1rem; line-height: 1.8;">Rooted in Saudi Arabia, we bring the best in class services and capabilities. We are deeply committed to ensuring your industrial and infrastructure projects succeed on every level with uncompromising quality and safety.</p>
                <a href="about-us.html" class="btn btn-primary" style="margin-top: 30px; background: #ff7e00; color: white; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: 600;">Learn More</a>
            </div>
        </div>
    </section>

    <!-- Achievements Section -->
    <section class="achievements-section section-padding" style="background-color: #0b3d91; color: #fff;">
        <div class="container">
            <div class="achievements-grid" style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: center;">
                <div class="achievements-images" style="position: relative; height: 350px;">
                    <img src="assets/WhatsApp-Image-2025-08-30-at-13-47-35.jpeg" alt="Achievement 1" style="width: 70%; border-radius: 12px; position: absolute; top: 0; left: 0; border: 5px solid #0b3d91; z-index: 2; box-shadow: 0 15px 30px rgba(0,0,0,0.2);">
                    <img src="assets/Picture7.jpg" alt="Achievement 2" style="width: 60%; border-radius: 12px; position: absolute; bottom: 0; right: 0; border: 5px solid #0b3d91; box-shadow: 0 15px 30px rgba(0,0,0,0.2);">
                </div>
                <div class="achievements-stats-col">
                    <span style="color: #ff7e00; font-weight: 700; letter-spacing: 2px;">AT A GLANCE</span>
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin: 15px 0 20px;">Our Achievements At A Glance</h2>
                    <p style="opacity: 0.8; margin-bottom: 40px; font-size: 1.05rem; line-height: 1.6;">We measure our success by the value we bring to our clients and the impact we make in the industry through dedication, expertise, and continuous innovation.</p>
                    <div class="stats-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div class="stat-box" style="border-left: 3px solid #ff7e00; padding-left: 20px;">
                            <h3 style="font-size: 3rem; color: #ff7e00; font-weight: 800; line-height: 1; margin-bottom: 5px;">5M+</h3>
                            <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Man Hours</p>
                        </div>
                        <div class="stat-box" style="border-left: 3px solid #ff7e00; padding-left: 20px;">
                            <h3 style="font-size: 3rem; color: #ff7e00; font-weight: 800; line-height: 1; margin-bottom: 5px;">150+</h3>
                            <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Projects Completed</p>
                        </div>
                        <div class="stat-box" style="border-left: 3px solid #ff7e00; padding-left: 20px;">
                            <h3 style="font-size: 3rem; color: #ff7e00; font-weight: 800; line-height: 1; margin-bottom: 5px;">50+</h3>
                            <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Multi Plant Sites</p>
                        </div>
                        <div class="stat-box" style="border-left: 3px solid #ff7e00; padding-left: 20px;">
                            <h3 style="font-size: 3rem; color: #ff7e00; font-weight: 800; line-height: 1; margin-bottom: 5px;">30+</h3>
                            <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Team Members</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Core Capabilities -->
    <section class="capabilities-section section-padding" style="background: #f5f7fa;">
        <div class="container">
            <div style="text-align: center; margin-bottom: 50px;">
                <span style="color: #ff7e00; font-weight: 700; letter-spacing: 2px;">EXPERTISE</span>
                <h2 style="font-size: 2.5rem; font-weight: 800; color: #0b3d91; margin-top: 10px;">Our Core Capabilities</h2>
            </div>
            <div class="capabilities-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
                <a href="#" class="cap-card" style="position: relative; border-radius: 12px; overflow: hidden; display: block; aspect-ratio: 4/3; text-decoration: none;">
                    <img src="assets/WhatsApp-Image-2025-09-04-at-10-30-26.jpeg" alt="EPC Project" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 25px; background: linear-gradient(to top, rgba(11,61,145,0.9), transparent); color: white; display: flex; justify-content: space-between; align-items: flex-end;">
                        <h4 style="font-size: 1.2rem; font-weight: 700; max-width: 80%;">EPC/LSTK Project</h4>
                        <div style="background: white; color: #0b3d91; width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </a>
                <a href="#" class="cap-card" style="position: relative; border-radius: 12px; overflow: hidden; display: block; aspect-ratio: 4/3; text-decoration: none;">
                    <img src="assets/Picture7.jpg" alt="Engineering" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 25px; background: linear-gradient(to top, rgba(11,61,145,0.9), transparent); color: white; display: flex; justify-content: space-between; align-items: flex-end;">
                        <h4 style="font-size: 1.2rem; font-weight: 700; max-width: 80%;">Engineering & Design</h4>
                        <div style="background: white; color: #0b3d91; width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </a>
                <a href="#" class="cap-card" style="position: relative; border-radius: 12px; overflow: hidden; display: block; aspect-ratio: 4/3; text-decoration: none;">
                    <img src="assets/WhatsApp-Image-2025-08-30-at-13-47-35.jpeg" alt="Construction" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 25px; background: linear-gradient(to top, rgba(11,61,145,0.9), transparent); color: white; display: flex; justify-content: space-between; align-items: flex-end;">
                        <h4 style="font-size: 1.2rem; font-weight: 700; max-width: 80%;">Construction & Infrastructure</h4>
                        <div style="background: white; color: #0b3d91; width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </a>
                <a href="#" class="cap-card" style="position: relative; border-radius: 12px; overflow: hidden; display: block; aspect-ratio: 4/3; text-decoration: none;">
                    <img src="assets/WhatsApp-Image-2025-09-04-at-10-30-46.jpeg" alt="Mechanical" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 25px; background: linear-gradient(to top, rgba(11,61,145,0.9), transparent); color: white; display: flex; justify-content: space-between; align-items: flex-end;">
                        <h4 style="font-size: 1.2rem; font-weight: 700; max-width: 80%;">Mechanical Works</h4>
                        <div style="background: white; color: #0b3d91; width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </a>
                <a href="#" class="cap-card" style="position: relative; border-radius: 12px; overflow: hidden; display: block; aspect-ratio: 4/3; text-decoration: none;">
                    <img src="assets/WhatsApp-Image-2025-09-04-at-10-30-26.jpeg" alt="Electrical" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 25px; background: linear-gradient(to top, rgba(11,61,145,0.9), transparent); color: white; display: flex; justify-content: space-between; align-items: flex-end;">
                        <h4 style="font-size: 1.2rem; font-weight: 700; max-width: 80%;">Electrical & Instrumentation</h4>
                        <div style="background: white; color: #0b3d91; width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </a>
                <a href="#" class="cap-card" style="position: relative; border-radius: 12px; overflow: hidden; display: block; aspect-ratio: 4/3; text-decoration: none;">
                    <img src="assets/WhatsApp-Image-2025-08-30-at-13-47-35.jpeg" alt="Data Center" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 25px; background: linear-gradient(to top, rgba(11,61,145,0.9), transparent); color: white; display: flex; justify-content: space-between; align-items: flex-end;">
                        <h4 style="font-size: 1.2rem; font-weight: 700; max-width: 80%;">Data Center Solutions</h4>
                        <div style="background: white; color: #0b3d91; width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Innovative Solutions -->
    <section class="innovative-solutions section-padding" style="background: #fff;">
        <div class="container">
            <div style="text-align: center; margin-bottom: 50px;">
                <h2 style="font-size: 2.5rem; font-weight: 800; color: #0b3d91;">Innovative Solutions We Offer</h2>
            </div>
            <div class="solutions-grid-new" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
                <div class="solution-card-new" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid #ff7e00; position: relative;">
                    <i class="fas fa-expand-arrows-alt" style="color: #ff7e00; font-size: 2.5rem; margin-bottom: 20px;"></i>
                    <h4 style="font-size: 1.2rem; font-weight: 700; color: #0b3d91; margin-bottom: 15px;">Modular Floating Covers</h4>
                    <a href="#" style="color: #ff7e00; font-weight: 600; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 5px;">Explore More <i class="fas fa-angle-right"></i></a>
                </div>
                <div class="solution-card-new" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid #ff7e00; position: relative;">
                    <i class="fas fa-water" style="color: #ff7e00; font-size: 2.5rem; margin-bottom: 20px;"></i>
                    <h4 style="font-size: 1.2rem; font-weight: 700; color: #0b3d91; margin-bottom: 15px;">Industrial Water Treatment Systems</h4>
                    <a href="#" style="color: #ff7e00; font-weight: 600; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 5px;">Explore More <i class="fas fa-angle-right"></i></a>
                </div>
                <div class="solution-card-new" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid #ff7e00; position: relative;">
                    <i class="fas fa-thermometer-half" style="color: #ff7e00; font-size: 2.5rem; margin-bottom: 20px;"></i>
                    <h4 style="font-size: 1.2rem; font-weight: 700; color: #0b3d91; margin-bottom: 15px;">Process Heat Transfer Smart Solutions</h4>
                    <a href="#" style="color: #ff7e00; font-weight: 600; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 5px;">Explore More <i class="fas fa-angle-right"></i></a>
                </div>
                <div class="solution-card-new" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid #ff7e00; position: relative;">
                    <i class="fas fa-tachometer-alt" style="color: #ff7e00; font-size: 2.5rem; margin-bottom: 20px;"></i>
                    <h4 style="font-size: 1.2rem; font-weight: 700; color: #0b3d91; margin-bottom: 15px;">Acoustic Pyrometers Solutions</h4>
                    <a href="#" style="color: #ff7e00; font-weight: 600; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 5px;">Explore More <i class="fas fa-angle-right"></i></a>
                </div>
                <div class="solution-card-new" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid #ff7e00; position: relative;">
                    <i class="fas fa-cogs" style="color: #ff7e00; font-size: 2.5rem; margin-bottom: 20px;"></i>
                    <h4 style="font-size: 1.2rem; font-weight: 700; color: #0b3d91; margin-bottom: 15px;">Engineering Simulation Solutions</h4>
                    <a href="#" style="color: #ff7e00; font-weight: 600; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 5px;">Explore More <i class="fas fa-angle-right"></i></a>
                </div>
                <div class="solution-card-new" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid #ff7e00; position: relative;">
                    <i class="fas fa-industry" style="color: #ff7e00; font-size: 2.5rem; margin-bottom: 20px;"></i>
                    <h4 style="font-size: 1.2rem; font-weight: 700; color: #0b3d91; margin-bottom: 15px;">Venturi Steam Traps</h4>
                    <a href="#" style="color: #ff7e00; font-weight: 600; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 5px;">Explore More <i class="fas fa-angle-right"></i></a>
                </div>
            </div>
        </div>
    </section>

    <!-- Recent Projects Slider -->
    <section class="recent-projects section-padding" style="background: #f5f7fa; position: relative;">
        <div class="container">
            <div class="projects-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;">
                <div>
                    <span style="color: #ff7e00; font-weight: 700; letter-spacing: 2px;">OUR WORK</span>
                    <h2 style="font-size: 2.5rem; font-weight: 800; color: #0b3d91; margin-top: 10px;">Explore Our Recent Projects</h2>
                </div>
                <div class="projects-nav" style="display: flex; gap: 15px;">
                    <div class="proj-prev" style="width: 40px; height: 40px; border-radius: 50%; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display: flex; justify-content: center; align-items: center; cursor: pointer; color: #0b3d91;"><i class="fas fa-chevron-left"></i></div>
                    <div class="proj-next" style="width: 40px; height: 40px; border-radius: 50%; background: #0b3d91; color: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display: flex; justify-content: center; align-items: center; cursor: pointer;"><i class="fas fa-chevron-right"></i></div>
                </div>
            </div>
            
            <div class="swiper projects-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                            <img src="assets/WhatsApp-Image-2025-08-30-at-13-47-35.jpeg" alt="Project 1" style="width: 100%; height: 250px; object-fit: cover;">
                            <div style="padding: 25px;">
                                <h4 style="font-size: 1.1rem; font-weight: 700; color: #0b3d91;">Complete Erection Of Steam Turbine And Generator</h4>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                            <img src="assets/WhatsApp-Image-2025-09-04-at-10-30-26.jpeg" alt="Project 2" style="width: 100%; height: 250px; object-fit: cover;">
                            <div style="padding: 25px;">
                                <h4 style="font-size: 1.1rem; font-weight: 700; color: #0b3d91;">Electrical, Instrumentation, And Control System Works</h4>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                            <img src="assets/WhatsApp-Image-2025-09-04-at-10-30-46.jpeg" alt="Project 3" style="width: 100%; height: 250px; object-fit: cover;">
                            <div style="padding: 25px;">
                                <h4 style="font-size: 1.1rem; font-weight: 700; color: #0b3d91;">Supply & Installation Of Ducts And Grinding Machine</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-us section-padding" style="background: white;">
        <div class="container">
            <div class="why-choose-grid" style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: flex-start;">
                <div class="why-text-area">
                    <span class="badge" style="color: #ff7e00; font-weight: 700; letter-spacing: 2px;">EXCELLENCE IN ACTION</span>
                    <h2 class="section-title" style="font-size: 2.5rem; font-weight: 800; color: #0b3d91; margin: 15px 0 20px;">Why Choose Noman Maintenance Services Company?</h2>
                    <p class="section-subtitle" style="color: #666; font-size: 1.05rem; line-height: 1.6;">Explore our full range of services and solutions to see how we can support your next project with unmatched quality and dedication.</p>
                </div>
                
                <div class="why-cards-area" style="display: flex; flex-direction: column; gap: 20px;">
                    <div class="feature-card" style="background: #ffb13b; padding: 30px; border-radius: 12px; box-shadow: 0 10px 20px rgba(255,177,59,0.3);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 10px;">Expert Team:</h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.6;">With our experienced professionals, you are guaranteed accurate and reliable services. Our team has the knowledge to handle complex tasks.</p>
                    </div>
                    
                    <div class="feature-card" style="background: #ffb13b; padding: 30px; border-radius: 12px; box-shadow: 0 10px 20px rgba(255,177,59,0.3);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 10px;">Personalized Approach:</h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.6;">We believe every client and project is unique, and so are their requirements. That's why we offer tailored solutions designed to meet specific needs.</p>
                    </div>

                    <div class="feature-card" style="background: #ffb13b; padding: 30px; border-radius: 12px; box-shadow: 0 10px 20px rgba(255,177,59,0.3);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 10px;">Timely And Reliable:</h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.6;">At Noman Maintenance, we understand the value of time. We ensure all services are delivered promptly without compromising on quality.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Global Reach Section -->
    <section class="global-reach section-padding" style="background: #f5f7fa;">
        <div class="container">
            <div style="text-align: center; margin-bottom: 50px;">
                <h2 style="font-size: 2.5rem; font-weight: 800; color: #0b3d91;">Our Global Reach</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div style="background: #0b3d91; border-radius: 16px; padding: 40px; color: white;">
                    <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 20px; color: #ff7e00;"><i class="fas fa-map-marker-alt"></i> Global Operations</h3>
                    <p style="font-size: 1.05rem; line-height: 1.8; opacity: 0.9;">We have established a strong presence in the region, delivering top-tier industrial solutions to renowned clients. Our expansive network allows us to provide localized support with global standards, ensuring your projects run seamlessly no matter the location.</p>
                    <a href="#" style="color: #ff7e00; display: inline-block; margin-top: 20px; font-weight: 600; text-decoration: none;">Learn More <i class="fas fa-arrow-right"></i></a>
                </div>
                <div style="background: white; border-radius: 16px; padding: 40px; display: flex; justify-content: center; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <img src="assets/world_map_png_6_1.webp" alt="Global Reach Map" style="max-width: 100%; max-height: 250px;">
                </div>
            </div>
            
            <div style="background: #0b3d91; border-radius: 16px; padding: 40px; color: white; margin-top: 30px; display: flex; align-items: center; justify-content: space-between;">
                <div style="flex: 1;">
                    <span style="color: #ff7e00; font-weight: 700; letter-spacing: 2px; font-size: 0.85rem;">OUR COMMITMENT</span>
                    <h3 style="font-size: 2rem; font-weight: 800; margin: 10px 0;">Building Trust, One Project At A Time</h3>
                </div>
                <div style="flex: 1; display: flex; gap: 15px; justify-content: flex-end;">
                    <img src="assets/WhatsApp-Image-2025-08-30-at-13-47-35.jpeg" alt="Work 1" style="width: 120px; height: 90px; object-fit: cover; border-radius: 8px;">
                    <img src="assets/WhatsApp-Image-2025-09-04-at-10-30-26.jpeg" alt="Work 2" style="width: 120px; height: 90px; object-fit: cover; border-radius: 8px;">
                    <img src="assets/Picture7.jpg" alt="Work 3" style="width: 120px; height: 90px; object-fit: cover; border-radius: 8px;">
                </div>
            </div>
        </div>
    </section>
`;

let resultHtml = header + newBody + footer;

// Add Swiper CSS if not present
if (!resultHtml.includes('swiper-bundle.min.css')) {
    resultHtml = resultHtml.replace(
        '</head>', 
        '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>'
    );
}

// Add Swiper JS and initialization script before </body>
if (!resultHtml.includes('swiper-bundle.min.js')) {
    const scripts = `
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const heroSwiper = new Swiper('.hero-swiper', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.hero-next',
                    prevEl: '.hero-prev',
                },
                effect: 'fade',
            });

            const projectsSwiper = new Swiper('.projects-swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.proj-next',
                    prevEl: '.proj-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });
        });
    </script>
</body>`;
    resultHtml = resultHtml.replace('</body>', scripts);
}

fs.writeFileSync('index.html', resultHtml);
console.log('Successfully updated index.html');
