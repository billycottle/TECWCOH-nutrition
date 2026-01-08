export interface Coach {
  name: string;
  photo: string;
  title: string;
  specialty: string;
  bio: string;
  credentials?: string[];
}

interface CoachCardProps {
  coach: Coach;
}

export default function CoachCard({ coach }: CoachCardProps) {
  const styles = {
    card: {
      background: 'white',
      border: '1px solid #383838',
      borderRadius: '0px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px',
    },
    photoContainer: {
      width: '100%',
      aspectRatio: '1',
      background: '#F4EFEA',
      border: '1px solid #383838',
      borderRadius: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    photo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    placeholderIcon: {
      fontSize: '48px',
      color: '#383838',
    },
    name: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '22px',
      fontWeight: 400,
      color: '#383838',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
      marginBottom: '4px',
    },
    title: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 400,
      color: '#2BA5FF',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
      marginBottom: '8px',
    },
    specialty: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '13px',
      fontWeight: 300,
      color: '#383838',
      fontStyle: 'italic' as const,
      marginBottom: '12px',
    },
    bio: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '1.6',
      marginBottom: '16px',
    },
    credentials: {
      marginTop: '12px',
      paddingTop: '16px',
      borderTop: '1px solid #383838',
    },
    credentialsTitle: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '12px',
      fontWeight: 400,
      color: '#383838',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
      marginBottom: '8px',
    },
    credentialsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    credentialItem: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '13px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '1.8',
      paddingLeft: '16px',
      position: 'relative' as const,
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.photoContainer}>
        {coach.photo ? (
          <img src={coach.photo} alt={coach.name} style={styles.photo} />
        ) : (
          <span style={styles.placeholderIcon}>👤</span>
        )}
      </div>

      <div>
        <h3 style={styles.name}>{coach.name}</h3>
        <p style={styles.title}>{coach.title}</p>
        <p style={styles.specialty}>{coach.specialty}</p>
        <p style={styles.bio}>{coach.bio}</p>

        {coach.credentials && coach.credentials.length > 0 && (
          <div style={styles.credentials}>
            <p style={styles.credentialsTitle}>Credentials</p>
            <ul style={styles.credentialsList}>
              {coach.credentials.map((credential, index) => (
                <li key={index} style={styles.credentialItem}>
                  • {credential}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
