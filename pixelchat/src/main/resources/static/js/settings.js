// Font Size Adjustment
function adjustFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    let rootFontSize;

    switch (fontSize) {
        case 'small':
            rootFontSize = '14px';
            break;
        case 'medium':
            rootFontSize = '16px';
            break;
        case 'large':
            rootFontSize = '18px';
            break;
        default:
            rootFontSize = '16px';
    }

    document.documentElement.style.fontSize = rootFontSize;
}

// Translations
const translations = {
    english: {
        "toggleAIButton": "Toggle Assistant",
        "menu-toggle": "Menu",
        "emergency-eject": "Emergency Eject",
        "system-settings-title": "System Settings",
        "ai-assistant-title": "Orion AI Assistant",
        "message-traffic-title": "Message Traffic",
        "sent-messages": "Sent Messages",
        "received-messages": "Received Messages",
        "peak-traffic-time": "Peak Traffic Time",
        "new-friends-hub": "New Friends Hub",
        "positivity-central": "Positivity Central",
        "friend-requests": "Friend Requests",
        "user-reports": "User Reports",
        "blog-posts": "Blog Posts",
        "sanctuary": "Sanctuary",
        "staff": "Staff",
        "backup-data": "Backup Data",
        "adjust-settings": "Adjust Settings",
        "site-wide-announcements": "Site-wide Announcements",
        "active-chats": "Active Chats",
        "pending-friend-requests": "Pending Friend Requests"
    },
    spanish: {
        'toggleAIButton': 'Alternar Asistente',
        'menu-toggle': 'Menú',
        'emergency-eject': 'Expulsión de Emergencia',
        'system-settings-title': 'Configuración del Sistema',
        'ai-assistant-title': 'Asistente AI Orion',
        'message-traffic-title': 'Tráfico de Mensajes',
        'sent-messages': 'Mensajes Enviados',
        'received-messages': 'Mensajes Recibidos',
        'peak-traffic-time': 'Hora de Mayor Tráfico',
        'new-friends-hub': 'Centro de Nuevos Amigos',
        'positivity-central': 'Central de Positividad',
        'friend-requests': 'Solicitudes de Amistad',
        'user-reports': 'Informes de Usuario',
        'blog-posts': 'Publicaciones de Blog',
        'sanctuary': 'Santuario',
        'staff': 'Personal',
        'backup-data': 'Datos de Respaldo',
        'adjust-settings': 'Ajustar Configuraciones',
        'site-wide-announcements': 'Anuncios en Todo el Sitio',
        "active-chats": "Chats Activos",
        "pending-friend-requests": "Solicitudes de Amistad Pendientes"
    },
    french: {
        'toggleAIButton': 'Basculer l\'Assistant',
        'menu-toggle': 'Menu',
        'emergency-eject': 'Éjection d\'Urgence',
        'system-settings-title': 'Paramètres du Système',
        'ai-assistant-title': 'Assistant AI Orion',
        'message-traffic-title': 'Trafic des Messages',
        'sent-messages': 'Messages Envoyés',
        'received-messages': 'Messages Reçus',
        'peak-traffic-time': 'Heure de Pointe du Trafic',
        'new-friends-hub': 'Hub des Nouveaux Amis',
        'positivity-central': 'Centre de Positivité',
        'friend-requests': 'Demandes d\'Amis',
        'user-reports': 'Rapports d\'Utilisateurs',
        'blog-posts': 'Articles de Blog',
        'sanctuary': 'Sanctuaire',
        'staff': 'Équipe',
        'backup-data': 'Données de Sauvegarde',
        'adjust-settings': 'Ajuster les Paramètres',
        'site-wide-announcements': 'Annonces sur Tout le Site',
        "active-chats": "Chats Actifs",
        "pending-friend-requests": "Demandes d'Amis en Attente"
    },
    german: {
        'toggleAIButton': 'Assistent umschalten',
        'menu-toggle': 'Menü',
        'emergency-eject': 'Notauswurf',
        'system-settings-title': 'Systemeinstellungen',
        'ai-assistant-title': 'Orion AI-Assistent',
        'message-traffic-title': 'Nachrichtenverkehr',
        'sent-messages': 'Gesendete Nachrichten',
        'received-messages': 'Empfangene Nachrichten',
        'peak-traffic-time': 'Hauptverkehrszeit',
        'new-friends-hub': 'Neue Freunde Zentrale',
        'positivity-central': 'Positivitätszentrale',
        'friend-requests': 'Freundschaftsanfragen',
        'user-reports': 'Benutzerberichte',
        'blog-posts': 'Blog Beiträge',
        'sanctuary': 'Zufluchtsort',
        'staff': 'Mitarbeiter',
        'backup-data': 'Datensicherung',
        'adjust-settings': 'Einstellungen Anpassen',
        'site-wide-announcements': 'Website-weite Ankündigungen',
        "active-chats": "Aktive Chats",
        "pending-friend-requests": "Ausstehende Freundschaftsanfragen"
    },


    italian: {
        'menu-toggle': 'Menu',
        'emergency-eject': 'Espulsione di Emergenza',
        'system-settings-title': 'Impostazioni Sistema',
        'ai-assistant-title': 'Assistente AI Orion',
        'message-traffic-title': 'Traffico di Messaggi',
        'sent-messages': 'Messaggi Inviati',
        'received-messages': 'Messaggi Ricevuti',
        'peak-traffic-time': 'Orario di Punta',
        'new-friends-hub': 'Centro Nuovi Amici',
        'positivity-central': 'Centralità Positiva',
        'friend-requests': 'Richieste di Amicizia',
        'user-reports': 'Rapporti Utenti',
        'blog-posts': 'Post del Blog',
        'sanctuary': 'Santuario',
        'staff': 'Personale',
        'backup-data': 'Dati di Backup',
        'adjust-settings': 'Modifica Impostazioni',
        'site-wide-announcements': 'Annunci su Tutto il Sito',
        "active-chats": "Chats Attivi",
        "pending-friend-requests": "Richieste di Amicizia in Sospeso"
    },
    portuguese: {
        'menu-toggle': 'Menu',
        'emergency-eject': 'Ejeção de Emergência',
        'system-settings-title': 'Configurações do Sistema',
        'ai-assistant-title': 'Assistente AI Orion',
        'message-traffic-title': 'Tráfego de Mensagens',
        'sent-messages': 'Mensagens Enviadas',
        'received-messages': 'Mensagens Recebidas',
        'peak-traffic-time': 'Hora de Pico',
        'new-friends-hub': 'Central de Novos Amigos',
        'positivity-central': 'Central de Positividade',
        'friend-requests': 'Pedidos de Amizade',
        'user-reports': 'Relatórios de Usuário',
        'blog-posts': 'Postagens de Blog',
        'sanctuary': 'Santuário',
        'staff': 'Equipe',
        'backup-data': 'Dados de Backup',
        'adjust-settings': 'Ajustar Configurações',
        'site-wide-announcements': 'Anúncios em Todo o Site',
        "active-chats": "Chats Ativos",
        "pending-friend-requests": "Pedidos de Amizade Pendentes"
    },

    japanese: {
        'toggleAIButton': 'アシスタントを切り替える',
        'menu-toggle': 'メニュー',
        'emergency-eject': '緊急イジェクト',
        'system-settings-title': 'システム設定',
        'ai-assistant-title': 'Orion AIアシスタント',
        'message-traffic-title': 'メッセージのトラフィック',
        'sent-messages': '送信されたメッセージ',
        'received-messages': '受信したメッセージ',
        'peak-traffic-time': 'ピーク時のトラフィック',
        'new-friends-hub': '新しい友達ハブ',
        'positivity-central': 'ポジティブセンター',
        'friend-requests': '友達のリクエスト',
        'user-reports': 'ユーザーレポート',
        'blog-posts': 'ブログの投稿',
        'sanctuary': '保護区',
        'staff': 'スタッフ',
        'backup-data': 'バックアップデータ',
        'adjust-settings': '設定を調整',
        'site-wide-announcements': 'サイト全体のアナウンスメント',
        "active-chats": "アクティブチャット",
        "pending-friend-requests": "保留中の友達リクエスト"
    },
    korean: {
        'toggleAIButton': '조수 전환',
        'menu-toggle': '메뉴',
        'emergency-eject': '긴급 이젝트',
        'system-settings-title': '시스템 설정',
        'ai-assistant-title': 'Orion AI 어시스턴트',
        'message-traffic-title': '메시지 트래픽',
        'sent-messages': '보낸 메시지들',
        'received-messages': '받은 메시지들',
        'peak-traffic-time': '트래픽 피크 시간',
        'new-friends-hub': '새 친구 허브',
        'positivity-central': '긍정 중앙',
        'friend-requests': '친구 요청',
        'user-reports': '사용자 보고서',
        'blog-posts': '블로그 게시물',
        'sanctuary': '성역',
        'staff': '직원',
        'backup-data': '백업 데이터',
        'adjust-settings': '설정 조정',
        'site-wide-announcements': '사이트 전체 공지사항',
        "active-chats": "활성 채팅",
        "pending-friend-requests": "보류 중인 친구 요청"
    },
    arabic: {
        'toggleAIButton': 'تبديل المساعد',
        'menu-toggle': 'قائمة',
        'emergency-eject': 'إخراج طارئ',
        'system-settings-title': 'إعدادات النظام',
        'ai-assistant-title': 'مساعد Orion AI',
        'message-traffic-title': 'حركة الرسائل',
        'sent-messages': 'الرسائل المرسلة',
        'received-messages': 'الرسائل المستلمة',
        'peak-traffic-time': 'وقت الذروة للحركة',
        'new-friends-hub': 'مركز الأصدقاء الجدد',
        'positivity-central': 'مركز الإيجابية',
        'friend-requests': 'طلبات الصداقة',
        'user-reports': 'تقارير المستخدم',
        'blog-posts': 'مشاركات المدونة',
        'sanctuary': 'مأوى',
        'staff': 'الموظفين',
        'backup-data': 'بيانات النسخ الاحتياطي',
        'adjust-settings': 'تعديل الإعدادات',
        'site-wide-announcements': 'إعلانات الموقع',
        "active-chats": "الدردشات النشطة",
        "pending-friend-requests": "طلبات الصداقة المعلقة"
    },
    turkish: {
        'toggleAIButton': 'Asistanı Değiştir',
        'menu-toggle': 'Menü',
        'emergency-eject': 'Acil Çıkış',
        'system-settings-title': 'Sistem Ayarları',
        'ai-assistant-title': 'Orion AI Asistanı',
        'message-traffic-title': 'Mesaj Trafiği',
        'sent-messages': 'Gönderilen Mesajlar',
        'received-messages': 'Alınan Mesajlar',
        'peak-traffic-time': 'Trafik Yoğunluk Saati',
        'new-friends-hub': 'Yeni Arkadaş Merkezi',
        'positivity-central': 'Pozitiflik Merkezi',
        'friend-requests': 'Arkadaşlık İstekleri',
        'user-reports': 'Kullanıcı Raporları',
        'blog-posts': 'Blog Gönderileri',
        'sanctuary': 'Sığınak',
        'staff': 'Personel',
        'backup-data': 'Yedek Veri',
        'adjust-settings': 'Ayarları Düzenle',
        'site-wide-announcements': 'Site Genelinde Duyurular',
        "active-chats": "Aktif Sohbetler",
        "pending-friend-requests": "Bekleyen Arkadaşlık İstekleri"
    },
    swedish: {
        'toggleAIButton': 'Växla Assistent',
        'menu-toggle': 'Meny',
        'emergency-eject': 'Nödutkast',
        'system-settings-title': 'Systeminställningar',
        'ai-assistant-title': 'Orion AI-assistent',
        'message-traffic-title': 'Meddelandetrafik',
        'sent-messages': 'Skickade meddelanden',
        'received-messages': 'Mottagna meddelanden',
        'peak-traffic-time': 'Topptrafiktid',
        'new-friends-hub': 'Nya Vänner Hub',
        'positivity-central': 'Positivitetscentral',
        'friend-requests': 'Vänförfrågningar',
        'user-reports': 'Användarrapporter',
        'blog-posts': 'Blogginlägg',
        'sanctuary': 'Helgedom',
        'staff': 'Personal',
        'backup-data': 'Säkerhetskopiera data',
        'adjust-settings': 'Justera inställningar',
        'site-wide-announcements': 'Webbplatsmeddelanden',
        "active-chats": "Aktiva Chatter",
        "pending-friend-requests": "Väntande Vänförfrågningar"
    },
    norwegian: {
        'toggleAIButton': 'Bytt Assistent',
        'menu-toggle': 'Meny',
        'emergency-eject': 'Nødutkast',
        'system-settings-title': 'Systeminnstillinger',
        'ai-assistant-title': 'Orion AI-assistent',
        'message-traffic-title': 'Meldingstrafikk',
        'sent-messages': 'Sendte meldinger',
        'received-messages': 'Mottatte meldinger',
        'peak-traffic-time': 'Topptrafikktid',
        'new-friends-hub': 'Ny Venn Hub',
        'positivity-central': 'Positivitetssentral',
        'friend-requests': 'Venneforespørsler',
        'user-reports': 'Brukerrapporter',
        'blog-posts': 'Blogginnlegg',
        'sanctuary': 'Helligdom',
        'staff': 'Personell',
        'backup-data': 'Sikkerhetskopieringsdata',
        'adjust-settings': 'Juster Innstillinger',
        'site-wide-announcements': 'Nettstedsvide Kunngjøringer',
        "active-chats": "Aktive Chatter",
        "pending-friend-requests": "Ventende Vennforespørsler"
    },
    dutch: {
        'toggleAIButton': 'Assistent schakelen',
        'menu-toggle': 'Menu',
        'emergency-eject': 'Nooduitwerp',
        'system-settings-title': 'Systeeminstellingen',
        'ai-assistant-title': 'Orion AI Assistent',
        'message-traffic-title': 'Berichtenverkeer',
        'sent-messages': 'Verstuurde Berichten',
        'received-messages': 'Ontvangen Berichten',
        'peak-traffic-time': 'Spitsuur',
        'new-friends-hub': 'Nieuwe Vrienden Hub',
        'positivity-central': 'Positiviteit Centraal',
        'friend-requests': 'Vriendschapsverzoeken',
        'user-reports': 'Gebruikersrapporten',
        'blog-posts': 'Blogberichten',
        'sanctuary': 'Toevluchtsoord',
        'staff': 'Personeel',
        'backup-data': 'Backup Data',
        'adjust-settings': 'Instellingen Aanpassen',
        'site-wide-announcements': 'Site-brede Aankondigingen',
        "active-chats": "Actieve Chats",
        "pending-friend-requests": "Openstaande Vriendschapsverzoeken"
    },
    greek: {
        'toggleAIButton': 'Εναλλαγή Βοηθού',
        'menu-toggle': 'Μενού',
        'emergency-eject': 'Έκτακτη Εκτίναξη',
        'system-settings-title': 'Ρυθμίσεις Συστήματος',
        'ai-assistant-title': 'Βοηθός Orion AI',
        'message-traffic-title': 'Κίνηση Μηνυμάτων',
        'sent-messages': 'Απεσταλμένα Μηνύματα',
        'received-messages': 'Ληφθέντα Μηνύματα',
        'peak-traffic-time': 'Ώρα Κορυφαίας Κίνησης',
        'new-friends-hub': 'Κέντρο Νέων Φίλων',
        'positivity-central': 'Κέντρο Θετικότητας',
        'friend-requests': 'Αιτήματα Φιλίας',
        'user-reports': 'Αναφορές Χρηστών',
        'blog-posts': 'Δημοσιεύσεις Ιστολογίου',
        'sanctuary': 'Καταφύγιο',
        'staff': 'Προσωπικό',
        'backup-data': 'Δεδομένα Αντιγράφου Ασφαλείας',
        'adjust-settings': 'Ρύθμιση Ρυθμίσεων',
        'site-wide-announcements': 'Ανακοινώσεις Ολόκληρου του Ιστότοπου',
        "active-chats": "Ενεργές Συνομιλίες",
        "pending-friend-requests": "Εκκρεμείς Αιτήσεις Φιλίας"
    },
    hindi: {
        'toggleAIButton': 'सहायक टॉगल करें',
        'menu-toggle': 'मेनू',
        'emergency-eject': 'आपातकालीन निकास',
        'system-settings-title': 'प्रणाली सेटिंग्स',
        'ai-assistant-title': 'ओरियन ए.आई. सहायक',
        'message-traffic-title': 'संदेश यातायात',
        'sent-messages': 'भेजे गए संदेश',
        'received-messages': 'प्राप्त संदेश',
        'peak-traffic-time': 'यातायात का शिखर समय',
        'new-friends-hub': 'नए दोस्त हब',
        'positivity-central': 'सकारात्मकता केंद्र',
        'friend-requests': 'मित्र अनुरोध',
        'user-reports': 'उपयोगकर्ता रिपोर्ट',
        'blog-posts': 'ब्लॉग पोस्ट',
        'sanctuary': 'आश्रय',
        'staff': 'कर्मचारी',
        'backup-data': 'बैकअप डेटा',
        'adjust-settings': 'सेटिंग्स समायोजित करें',
        'site-wide-announcements': 'साइट-वाइड घोषणाएं',
        "active-chats": "सक्रिय चैट",
        "pending-friend-requests": "लंबित मित्र अनुरोध"
    },
    finnish: {
        'toggleAIButton': 'Vaihda avustaja',
        'menu-toggle': 'Valikko',
        'emergency-eject': 'Hätäpoisto',
        'system-settings-title': 'Järjestelmäasetukset',
        'ai-assistant-title': 'Orion AI Avustaja',
        'message-traffic-title': 'Viestiliikenne',
        'sent-messages': 'Lähetetyt Viestit',
        'received-messages': 'Vastaanotetut Viestit',
        'peak-traffic-time': 'Liikenteen Huippuaika',
        'new-friends-hub': 'Uudet Ystävät Keskus',
        'positivity-central': 'Positiivisuus Keskus',
        'friend-requests': 'Ystäväpyynnöt',
        'user-reports': 'Käyttäjäraportit',
        'blog-posts': 'Blogikirjoitukset',
        'sanctuary': 'Pyhäkkö',
        'staff': 'Henkilökunta',
        'backup-data': 'Varmuuskopioi Tiedot',
        'adjust-settings': 'Säädä Asetuksia',
        'site-wide-announcements': 'Sivuston Laajuiset Ilmoitukset',
        "active-chats": "Aktiiviset Keskustelut",
        "pending-friend-requests": "Odottavat Ystäväpyynnöt"
    },
    danish: {
        'toggleAIButton': 'Skift assistent',
        'menu-toggle': 'Menu',
        'emergency-eject': 'Nødudkast',
        'system-settings-title': 'Systemindstillinger',
        'ai-assistant-title': 'Orion AI Assistent',
        'message-traffic-title': 'Beskedtrafik',
        'sent-messages': 'Sendte Beskeder',
        'received-messages': 'Modtagne Beskeder',
        'peak-traffic-time': 'Trafikspidstid',
        'new-friends-hub': 'Ny Venner Hub',
        'positivity-central': 'Positivitet Central',
        'friend-requests': 'Venskabsanmodninger',
        'user-reports': 'Brugerrapporter',
        'blog-posts': 'Blogindlæg',
        'sanctuary': 'Frirum',
        'staff': 'Personale',
        'backup-data': 'Backup Data',
        'adjust-settings': 'Justér Indstillinger',
        'site-wide-announcements': 'Site-brede Bekendtgørelser',
        "active-chats": "Aktive Chats",
        "pending-friend-requests": "Afventende Venskabsanmodninger"
    },
    polish: {
        'toggleAIButton': 'Przełącz asystenta',
        'menu-toggle': 'Menu',
        'emergency-eject': 'Awaryjne Wyrzucenie',
        'system-settings-title': 'Ustawienia Systemu',
        'ai-assistant-title': 'Orion AI Asystent',
        'message-traffic-title': 'Ruch Wiadomości',
        'sent-messages': 'Wysłane Wiadomości',
        'received-messages': 'Otrzymane Wiadomości',
        'peak-traffic-time': 'Szczytowy Czas Ruchu',
        'new-friends-hub': 'Hub Nowych Przyjaciół',
        'positivity-central': 'Centrala Pozytywności',
        'friend-requests': 'Zaproszenia do Znajomych',
        'user-reports': 'Raporty Użytkowników',
        'blog-posts': 'Posty na Blogu',
        'sanctuary': 'Azyl',
        'staff': 'Personel',
        'backup-data': 'Dane Kopii Zapasowej',
        'adjust-settings': 'Dostosuj Ustawienia',
        'site-wide-announcements': 'Ogłoszenia na Całej Stronie',
        "active-chats": "Aktywne Czaty",
        "pending-friend-requests": "Oczekujące Zaproszenia do Znajomych"
    },
    hungarian: {
        'toggleAIButton': 'Asszisztens váltása',
        'menu-toggle': 'Menü',
        'emergency-eject': 'Vészhelyzeti Kilövés',
        'system-settings-title': 'Rendszerbeállítások',
        'ai-assistant-title': 'Orion AI Asszisztens',
        'message-traffic-title': 'Üzenetforgalom',
        'sent-messages': 'Elküldött Üzenetek',
        'received-messages': 'Fogadott Üzenetek',
        'peak-traffic-time': 'Csúcsforgalmi Idő',
        'new-friends-hub': 'Új Barátok Központja',
        'positivity-central': 'Pozitivitás Központ',
        'friend-requests': 'Baráti Kérelmek',
        'user-reports': 'Felhasználói Jelentések',
        'blog-posts': 'Blogbejegyzések',
        'sanctuary': 'Menhely',
        'staff': 'Személyzet',
        'backup-data': 'Adatmentés',
        'adjust-settings': 'Beállítások Módosítása',
        'site-wide-announcements': 'Oldalszintű Közlemények',
        "active-chats": "Aktív Csevegések",
        "pending-friend-requests": "Függőben lévő Baráti Kérelmek"
    }
};



// Adjusting the language
function adjustLanguage() {
    const language = document.getElementById('language').value;
    const langTrans = translations[language];

    if (langTrans) {
        document.getElementById('menu-toggle').textContent = langTrans['menu-toggle'];
        document.querySelector('.system-settings-sphere .settings-button').textContent = langTrans['system-settings-title'];
        document.querySelector('.ai-box h4').textContent = langTrans['ai-assistant-title'];
        document.querySelector('.emergency-eject').textContent = langTrans['emergency-eject'];
        document.querySelector('.message-monitor h2').textContent = langTrans['message-traffic'];
        document.getElementById('toggleAIButton').textContent = langTrans['toggleAIButton'];

        const radialMenuItems = document.querySelectorAll('.radial-menu .menu-list li');
        radialMenuItems.forEach((item, index) => {
            const labels = ['new-friends-hub', 'positivity-central', 'friend-requests', 'user-reports', 'blog-posts', 'sanctuary', 'staff'];
            item.textContent = langTrans[labels[index]];
        });

        const messageTrafficItems = document.querySelectorAll('.message-monitor ul li');
        messageTrafficItems[0].innerHTML = `<strong>${langTrans['sent-messages']}:</strong> ${document.querySelector('#sent-messages').innerText}`;
        messageTrafficItems[1].innerHTML = `<strong>${langTrans['received-messages']}:</strong> ${document.querySelector('#received-messages').innerText}`;
        messageTrafficItems[2].innerHTML = `<strong>${langTrans['peak-traffic-time']}:</strong> ${document.querySelector('#peak-time').innerText}`;
        messageTrafficItems[3].innerHTML = `<strong>${langTrans['active-chats']}:</strong> ${document.querySelector('#active-chats').innerText}`;
        messageTrafficItems[4].innerHTML = `<strong>${langTrans['pending-friend-requests']}:</strong> ${document.querySelector('#pending-requests').innerText}`;
    }

    const systemSettingsItems = document.querySelectorAll('.system-settings-sphere .settings-list li');
    systemSettingsItems.forEach((item, index) => {
        const labels = ['backup-data', 'adjust-settings', 'site-wide-announcements'];
        item.textContent = langTrans[labels[index]];
    });
}



// Save Settings Function
function saveSettings() {
    // Logic to save settings
    adjustFontSize(); // Adjust the font size immediately after saving
    adjustLanguage(); // Adjust the language immediately after saving

    alert('Settings saved successfully!');
    document.getElementById('adjustSettingsModal').style.display = 'none';
}

// Adding an event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Add event listener for the language dropdown change
    document.getElementById('language').addEventListener('change', adjustLanguage);
});