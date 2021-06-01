import java.util.*;
import java.util.stream.Collectors;

public class UserService {
    public Map<Long, User> users = new HashMap<>();

    public List<User> getUsersBySex(User.Sex sex) {
        return users.values().stream().filter(user -> user.getSex() == sex).collect(Collectors.toList());
    }

    public void addUser(User ...users) {
        Arrays.stream(users).forEach(user -> this.users.put(user.getId(), user));
    }

    public List<User> getUsers() {
        return new ArrayList<>(users.values());
    }

    public int getUsersCount() {
        return getUsers().size();
    }

    public int getUsersCountBySex(User.Sex sex) {
        return getUsersBySex(sex).size();
    }

    public double getUsersAvgAgeBySex(User.Sex sex) {
        return getUsersBySex(sex).stream().mapToInt(User::getAge).reduce(0, Integer::sum) / (double) getUsersCountBySex(sex);
    }

    public static boolean isUsersEquals(User user1, User user2) {
        return user1.getSex() == user2.getSex() && user1.getAge() == user2.getAge() &&
                user1.getName().equals(user2.getName()) && user1.getId() == user2.getId();
    }
}
