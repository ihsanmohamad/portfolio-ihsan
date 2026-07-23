import { createContext } from 'svelte';

export const SITE_ORIGIN = 'https://portfolio-ihsan-production.temps.popyt.io';

export type Locale = 'en' | 'ms-MY';

export interface Messages {
	language: {
		selectorLabel: string;
		switchTo: Record<Locale, string>;
	};
	nav: {
		home: string;
		about: string;
		work: string;
		writing: string;
		hireMe: string;
		getInTouch: string;
		openMenu: string;
		closeMenu: string;
		navigation: string;
		connect: string;
		allRightsReserved: string;
	};
	common: {
		present: string;
		now: string;
		stack: string;
		experience: string;
		recognition: string;
		view: string;
		live: string;
		repository: string;
		source: string;
	};
	home: {
		currently: string;
		selectedProjects: string;
		thingsBuilt: string;
		viewAllWorks: string;
		toolsHeadingStart: string;
		toolsHeadingEmphasis: string;
		toolsDescription: string;
		whereWorkedStart: string;
		whereWorkedEmphasis: string;
		fullCareerHistory: string;
		proudMomentsStart: string;
		proudMomentsEmphasis: string;
		buildTogetherStart: string;
		buildTogetherEmphasis: string;
		buildTogetherDescription: string;
	};
	about: {
		eyebrow: string;
		heroStart: string;
		heroEmphasis: string;
		profileDetail: (location: string) => string;
		recentWork: string;
		careerHeadingStart: string;
		careerHeadingEmphasis: string;
		education: string;
		learningHeadingStart: string;
		learningHeadingEmphasis: string;
		bachelorsDate: string;
		bachelorsDegree: string;
		diplomaDate: string;
		diplomaDegree: string;
		gradeLabel: string;
		skills: string;
		skillsHeadingStart: string;
		skillsHeadingEmphasis: string;
		certifications: string;
		credentials: string;
		awards: string;
		highlights: string;
		fullPicture: string;
		fullPictureDescription: string;
		requestCv: string;
	};
	projects: {
		eyebrow: string;
		heroStart: string;
		heroEmphasis: string;
		intro: string;
		readCaseStudy: string;
	};
	project: {
		backToAll: string;
		visitLive: string;
		previous: string;
		next: string;
	};
	contact: {
		eyebrow: string;
		heroStart: string;
		heroEmphasis: string;
		intro: string;
		email: string;
		phone: string;
		basedIn: string;
		aroundTheWeb: string;
	};
	blog: {
		eyebrow: string;
		heroStart: string;
		heroEmphasis: string;
		intro: string;
		noPosts: string;
		noPostsDescription: string;
		minuteRead: string;
	};
}

export interface I18nContext {
	readonly locale: Locale;
	readonly messages: Messages;
	localized: (path: string) => string;
	setLocale: (locale: Locale) => void;
}

export const LOCALE_OPTIONS: ReadonlyArray<{ code: Locale; label: string }> = [
	{ code: 'en', label: 'EN' },
	{ code: 'ms-MY', label: 'BM' }
];

export const LOCALE_COOKIE = 'portfolio-locale';

export function localizedPath(locale: Locale, path: string): string {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `/${locale}${normalized === '/' ? '' : normalized}`;
}

export function swapLocaleInPath(
	pathname: string,
	nextLocale: Locale,
	slugMaps?: {
		byLocale: Record<Locale, Record<string, string>>;
		byCanonical: Record<Locale, Record<string, string>>;
	}
): string {
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length === 0) return `/${nextLocale}`;

	if (!isLocale(segments[0])) {
		segments.unshift(nextLocale);
		return `/${segments.join('/')}`;
	}

	const currentLocale = segments[0] as Locale;
	segments[0] = nextLocale;

	if (slugMaps && segments.length > 1) {
		const currentSlug = segments[1];
		const currentCanonical = slugMaps.byLocale[currentLocale]?.[currentSlug];
		if (currentCanonical) {
			const nextSlug = slugMaps.byCanonical[nextLocale]?.[currentCanonical];
			if (nextSlug) segments[1] = nextSlug;
		}
	}

	return `/${segments.join('/')}`;
}

export function persistLocale(locale: Locale) {
	if (typeof document === 'undefined') return;
	const oneYear = 60 * 60 * 24 * 365;
	document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${oneYear}; SameSite=Lax`;
}

export const MESSAGES: Record<Locale, Messages> = {
	en: {
		language: {
			selectorLabel: 'Choose language',
			switchTo: {
				en: 'Switch language to English',
				'ms-MY': 'Switch language to Malaysian Malay'
			}
		},
		nav: {
			home: 'Home',
			about: 'About',
			work: 'Work',
			writing: 'Writing',
			hireMe: 'Hire me',
			getInTouch: 'Get in touch',
			openMenu: 'Open menu',
			closeMenu: 'Close menu',
			navigation: 'Navigation',
			connect: 'Connect',
			allRightsReserved: 'ALL RIGHTS RESERVED.'
		},
		common: {
			present: 'Present',
			now: 'Now',
			stack: 'Stack',
			experience: 'Experience',
			recognition: 'Recognition',
			view: 'View',
			live: 'Live',
			repository: 'Repo',
			source: 'Source'
		},
		home: {
			currently: 'Currently',
			selectedProjects: 'Selected Projects',
			thingsBuilt: "Things I've built.",
			viewAllWorks: 'View All Works',
			toolsHeadingStart: 'Tools I reach',
			toolsHeadingEmphasis: 'for first.',
			toolsDescription:
				'Pragmatic choices over religious ones — these are the technologies I know best and trust most in production.',
			whereWorkedStart: "Where I've",
			whereWorkedEmphasis: 'worked.',
			fullCareerHistory: 'Full career history',
			proudMomentsStart: "Moments I'm",
			proudMomentsEmphasis: 'proud of.',
			buildTogetherStart: "Let's build",
			buildTogetherEmphasis: 'together.',
			buildTogetherDescription:
				'Open to interesting projects, freelance work, or full-time roles in AI engineering, AWS architecture, or full-stack TypeScript.'
		},
		about: {
			eyebrow: 'About',
			heroStart: 'Builder at',
			heroEmphasis: 'heart.',
			profileDetail: (location) =>
				`I'm based in ${location}, work primarily in JavaScript and TypeScript, and care deeply about shipping systems that are reliable enough to ignore.`,
			recentWork:
				'My recent work sits at the intersection of agentic AI and enterprise — building platforms that orchestrate LLMs, tools, and humans across real workflows (payments, customer operations, plantation ops). Before that I led front-end teams and integrated payment systems into early-stage fintech.',
			careerHeadingStart: 'Career',
			careerHeadingEmphasis: 'timeline.',
			education: 'Education',
			learningHeadingStart: 'Where I',
			learningHeadingEmphasis: 'learned.',
			bachelorsDate: 'Sep 2017 – Mar 2021',
			bachelorsDegree: 'BSc Computer Science (Computer System and Networking)',
			diplomaDate: 'Jun 2014 – Jun 2017',
			diplomaDegree: 'Diploma in Information Technology (Networking)',
			gradeLabel: 'CGPA',
			skills: 'Skills',
			skillsHeadingStart: 'What I',
			skillsHeadingEmphasis: 'work with.',
			certifications: 'Certifications',
			credentials: 'Credentials.',
			awards: 'Awards',
			highlights: 'Highlights.',
			fullPicture: 'Want the full picture?',
			fullPictureDescription:
				'Reach out for a printed CV, references, or to talk through a project.',
			requestCv: 'Request CV'
		},
		projects: {
			eyebrow: 'Work',
			heroStart: 'Selected',
			heroEmphasis: 'projects.',
			intro:
				'Side projects, paid work, and open-source contributions. Each one is a real system I shipped and supported — not a screenshot.',
			readCaseStudy: 'Read case study'
		},
		project: {
			backToAll: 'Back to all work',
			visitLive: 'Visit live',
			previous: 'Previous',
			next: 'Next'
		},
		contact: {
			eyebrow: 'Contact',
			heroStart: 'Say',
			heroEmphasis: 'hello.',
			intro:
				'Open to interesting projects, freelance contracts, and full-time roles in AI engineering, AWS architecture, or full-stack TypeScript. I usually reply within a day.',
			email: 'Email',
			phone: 'Phone',
			basedIn: 'Based in',
			aroundTheWeb: 'Around the web'
		},
		blog: {
			eyebrow: 'Writing',
			heroStart: 'Notes &',
			heroEmphasis: 'writing.',
			intro:
				'Articles on AI engineering, AWS architecture, and building things that actually ship.',
			noPosts: 'No posts yet',
			noPostsDescription: 'Publishing here soon. In the meantime, find me on',
			minuteRead: 'min read'
		}
	},
	'ms-MY': {
		language: {
			selectorLabel: 'Pilih bahasa',
			switchTo: {
				en: 'Tukar bahasa kepada bahasa Inggeris',
				'ms-MY': 'Tukar bahasa kepada Bahasa Melayu'
			}
		},
		nav: {
			home: 'Laman Utama',
			about: 'Tentang',
			work: 'Projek',
			writing: 'Penulisan',
			hireMe: 'Upah saya',
			getInTouch: 'Hubungi saya',
			openMenu: 'Buka menu',
			closeMenu: 'Tutup menu',
			navigation: 'Navigasi',
			connect: 'Hubungi',
			allRightsReserved: 'HAK CIPTA TERPELIHARA.'
		},
		common: {
			present: 'Kini',
			now: 'Sekarang',
			stack: 'Teknologi',
			experience: 'Pengalaman',
			recognition: 'Pengiktirafan',
			view: 'Lihat',
			live: 'Laman langsung',
			repository: 'Repositori',
			source: 'Kod sumber'
		},
		home: {
			currently: 'Sekarang',
			selectedProjects: 'Projek Pilihan',
			thingsBuilt: 'Hasil kerja saya.',
			viewAllWorks: 'Lihat Semua Projek',
			toolsHeadingStart: 'Alat yang saya',
			toolsHeadingEmphasis: 'utamakan.',
			toolsDescription:
				'Pilihan praktikal mengatasi pegangan mutlak — inilah teknologi yang paling saya kuasai dan percayai untuk sistem produksi.',
			whereWorkedStart: 'Tempat saya',
			whereWorkedEmphasis: 'bekerja.',
			fullCareerHistory: 'Sejarah kerjaya penuh',
			proudMomentsStart: 'Pencapaian yang saya',
			proudMomentsEmphasis: 'banggakan.',
			buildTogetherStart: 'Mari bina',
			buildTogetherEmphasis: 'bersama.',
			buildTogetherDescription:
				'Saya terbuka kepada projek menarik, kerja bebas, atau jawatan sepenuh masa dalam kejuruteraan AI, seni bina AWS, atau pembangunan TypeScript tindanan penuh.'
		},
		about: {
			eyebrow: 'Tentang Saya',
			heroStart: 'Pembina sepenuh',
			heroEmphasis: 'jiwa.',
			profileDetail: (location) =>
				`Saya menetap di ${location}, bekerja terutamanya dengan JavaScript dan TypeScript, serta amat mementingkan pembinaan sistem yang cukup andal sehingga tidak perlu dirisaukan.`,
			recentWork:
				'Kerja terkini saya berada di persimpangan AI berasaskan ejen dan perusahaan — membina platform yang menyelaras LLM, alatan, dan manusia dalam aliran kerja sebenar (pembayaran, operasi pelanggan, operasi perladangan). Sebelum itu, saya mengetuai pasukan bahagian hadapan dan mengintegrasikan sistem pembayaran untuk syarikat teknologi kewangan peringkat awal.',
			careerHeadingStart: 'Garis masa',
			careerHeadingEmphasis: 'kerjaya.',
			education: 'Pendidikan',
			learningHeadingStart: 'Tempat saya',
			learningHeadingEmphasis: 'belajar.',
			bachelorsDate: 'Sep 2017 – Mac 2021',
			bachelorsDegree: 'Ijazah Sarjana Muda Sains Komputer (Sistem Komputer dan Rangkaian)',
			diplomaDate: 'Jun 2014 – Jun 2017',
			diplomaDegree: 'Diploma Teknologi Maklumat (Rangkaian)',
			gradeLabel: 'PNGK',
			skills: 'Kemahiran',
			skillsHeadingStart: 'Teknologi yang saya',
			skillsHeadingEmphasis: 'gunakan.',
			certifications: 'Pensijilan',
			credentials: 'Kelayakan.',
			awards: 'Anugerah',
			highlights: 'Sorotan.',
			fullPicture: 'Mahukan gambaran lengkap?',
			fullPictureDescription:
				'Hubungi saya untuk CV bercetak, rujukan, atau berbincang tentang sesuatu projek.',
			requestCv: 'Minta CV'
		},
		projects: {
			eyebrow: 'Karya',
			heroStart: 'Projek',
			heroEmphasis: 'pilihan.',
			intro:
				'Projek sampingan, kerja berbayar, dan sumbangan sumber terbuka. Setiap satunya ialah sistem sebenar yang saya lancarkan dan sokong — bukan sekadar tangkap layar.',
			readCaseStudy: 'Baca kajian kes'
		},
		project: {
			backToAll: 'Kembali ke semua projek',
			visitLive: 'Lawati laman',
			previous: 'Sebelumnya',
			next: 'Seterusnya'
		},
		contact: {
			eyebrow: 'Hubungi',
			heroStart: 'Mari',
			heroEmphasis: 'berbual.',
			intro:
				'Saya terbuka kepada projek menarik, kontrak kerja bebas, dan jawatan sepenuh masa dalam kejuruteraan AI, seni bina AWS, atau pembangunan TypeScript tindanan penuh. Saya biasanya membalas dalam masa sehari.',
			email: 'E-mel',
			phone: 'Telefon',
			basedIn: 'Berpangkalan di',
			aroundTheWeb: 'Di platform lain'
		},
		blog: {
			eyebrow: 'Penulisan',
			heroStart: 'Nota &',
			heroEmphasis: 'penulisan.',
			intro:
				'Artikel tentang kejuruteraan AI, seni bina AWS, dan membina sesuatu yang benar-benar dapat dilancarkan.',
			noPosts: 'Belum ada tulisan',
			noPostsDescription:
				'Tulisan akan diterbitkan di sini tidak lama lagi. Sementara itu, temui saya di',
			minuteRead: 'min bacaan'
		}
	}
};

export function isLocale(value: string | null): value is Locale {
	return value === 'en' || value === 'ms-MY';
}

export const [getI18nContext, setI18nContext] = createContext<I18nContext>();
