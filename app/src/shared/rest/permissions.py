class RESTContext:
    def __init__(self, *,
                 username: str,
                 role: str) -> None:
        self.username = username
        self.role = role