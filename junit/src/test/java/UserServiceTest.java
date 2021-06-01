import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class UserServiceTest {

    @Test
    public void getUsersBySex() {
        UserService service = new UserService();
        User vasya = new User(1, "Vasya", 10, User.Sex.MALE);
        User masha = new User(2, "Masha", 21, User.Sex.FEMALE);
        User petya = new User(3, "Petya", 44, User.Sex.MALE);
        User sasha = new User(4, "Sasha", 81, User.Sex.FEMALE);
        User vova = new User(5, "Vova", 23, User.Sex.MALE);
        service.addUser(vasya, masha, petya, sasha, vova);

        List<User> actualMale = service.getUsersBySex(User.Sex.MALE);
        List<User> actualFemale = service.getUsersBySex(User.Sex.FEMALE);

        List<User> expectedMale = new ArrayList<>();
        expectedMale.add(vasya);
        expectedMale.add(petya);
        expectedMale.add(vova);

        List<User> expectedFemale = new ArrayList<>();
        expectedFemale.add(masha);
        expectedFemale.add(sasha);

        Assert.assertEquals(expectedMale, actualMale);
        Assert.assertEquals(expectedFemale, actualFemale);

    }

    @Test
    public void getUsers() {
        UserService service = new UserService();
        User vasya = new User(1, "Vasya", 10, User.Sex.MALE);
        User masha = new User(2, "Masha", 21, User.Sex.FEMALE);
        User petya = new User(3, "Petya", 44, User.Sex.MALE);
        User sasha = new User(4, "Sasha", 81, User.Sex.FEMALE);
        service.addUser(vasya, masha, petya, sasha);
        List<User> actual = service.getUsers();

        List<User> expected = new ArrayList<>();
        expected.add(vasya);
        expected.add(masha);
        expected.add(petya);
        expected.add(sasha);

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void getUsersCount() {
        UserService service = new UserService();
        User vasya = new User(1, "Vasya", 10, User.Sex.MALE);
        User masha = new User(2, "Masha", 21, User.Sex.FEMALE);
        User petya = new User(3, "Petya", 44, User.Sex.MALE);
        User sasha = new User(4, "Sasha", 81, User.Sex.FEMALE);
        service.addUser(vasya, masha, petya, sasha);
        int actual = service.getUsersCount();

        List<User> expected = new ArrayList<>();
        expected.add(vasya);
        expected.add(masha);
        expected.add(petya);
        expected.add(sasha);

        Assert.assertEquals(expected.size(), actual);
    }

    @Test
    public void getUsersCountBySex() {
        UserService service = new UserService();
        User vasya = new User(1, "Vasya", 10, User.Sex.MALE);
        User masha = new User(2, "Masha", 21, User.Sex.FEMALE);
        User petya = new User(3, "Petya", 44, User.Sex.MALE);
        User sasha = new User(4, "Sasha", 81, User.Sex.FEMALE);
        User vova = new User(5, "Vova", 23, User.Sex.MALE);
        service.addUser(vasya, masha, petya, sasha, vova);
        int actualMale = service.getUsersCountBySex(User.Sex.MALE);
        int actualFemale = service.getUsersCountBySex(User.Sex.FEMALE);

        Assert.assertEquals(3, actualMale);
        Assert.assertEquals(2, actualFemale);
    }

    @Test
    public void getUsersAvgAgeBySex() {
        UserService service = new UserService();
        User vasya = new User(1, "Vasya", 10, User.Sex.MALE);
        User masha = new User(2, "Masha", 21, User.Sex.FEMALE);
        User petya = new User(3, "Petya", 44, User.Sex.MALE);
        User sasha = new User(4, "Sasha", 81, User.Sex.FEMALE);
        User vova = new User(5, "Vova", 23, User.Sex.MALE);
        service.addUser(vasya, masha, petya, sasha, vova);
        double actualMale = service.getUsersAvgAgeBySex(User.Sex.MALE);
        double actualFemale = service.getUsersAvgAgeBySex(User.Sex.FEMALE);

        Assert.assertEquals((10 + 44 + 23) / 3.0, actualMale, 0.001);
        Assert.assertEquals((21 + 81) / 2.0, actualFemale, 0.001);
    }

    @Test
    public void isUsersEquals() {
        User masha = new User(2, "Masha", 21, User.Sex.FEMALE);
        User otherMasha = new User(2, "Masha", 21, User.Sex.FEMALE);
        User petya = new User(3, "Petya", 44, User.Sex.MALE);

        assertTrue(UserService.isUsersEquals(masha, masha));
        assertTrue(UserService.isUsersEquals(masha, otherMasha));
        assertFalse(UserService.isUsersEquals(masha, petya));
    }
}